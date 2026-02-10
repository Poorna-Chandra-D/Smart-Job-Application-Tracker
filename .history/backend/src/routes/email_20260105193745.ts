import express, { Request, Response } from 'express';
import { google } from 'googleapis';
import pool from '../db';
import { parseEmail } from '../services/emailService';

const router = express.Router();

// Gmail OAuth configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

// Generate Gmail OAuth URL
router.get('/gmail', (req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.modify'
    ],
    prompt: 'consent'
  });
  
  res.json({ authUrl });
});

// Gmail OAuth callback
router.get('/gmail/callback', async (req: Request, res: Response) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Get user email
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: 'me' });
    
    // Store in database (upsert by user + provider)
    const existingAccount = await pool.query(
      'SELECT id FROM email_accounts WHERE user_id = $1 AND provider = $2',
      [1, 'gmail']
    );

    if (existingAccount.rows.length > 0) {
      await pool.query(
        `UPDATE email_accounts
         SET access_token = $1,
             refresh_token = $2,
             email_address = $3
         WHERE id = $4`,
        [
          tokens.access_token,
          tokens.refresh_token,
          profile.data.emailAddress,
          existingAccount.rows[0].id
        ]
      );
    } else {
      await pool.query(
        `INSERT INTO email_accounts (user_id, provider, access_token, refresh_token, email_address)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          1, // Default user_id
          'gmail',
          tokens.access_token,
          tokens.refresh_token,
          profile.data.emailAddress
        ]
      );
    }

    res.send('<html><body><h1>Gmail connected successfully!</h1><p>You can close this window.</p><script>setTimeout(() => window.close(), 2000)</script></body></html>');
  } catch (error) {
    console.error('Gmail OAuth error:', error);
    res.status(500).json({ error: 'Failed to connect Gmail account' });
  }
});

// Get user emails
router.get('/', (req, res) => {
  res.json({ message: 'Get emails endpoint' });
});

// Parse emails for job applications
router.post('/parse', (req, res) => {
  res.json({ message: 'Parse emails endpoint' });
});

// Sync emails
router.post('/sync', async (req: Request, res: Response) => {
  try {
    const { user_id = 1, maxMessages = 15 } = req.body;

    // Get connected Gmail account
    const accountResult = await pool.query(
      'SELECT * FROM email_accounts WHERE user_id = $1 AND provider = $2',
      [user_id, 'gmail']
    );

    if (accountResult.rows.length === 0) {
      return res.status(404).json({ error: 'Gmail account not connected' });
    }

    const account = accountResult.rows[0];

    // Set credentials (will auto-refresh with refresh_token)
    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const listResp = await gmail.users.messages.list({
      userId: 'me',
      maxResults: maxMessages,
      q: 'subject:(application OR interview OR offer OR position)',
    });

    const messages = listResp.data.messages || [];
    let created = 0;
    let updated = 0;
    const skipped: string[] = [];

    for (const msg of messages) {
      if (!msg.id) continue;

      const full = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'full',
      });

      const payload = full.data.payload;
      const headers = payload?.headers || [];
      const subject = headers.find((h: any) => h.name === 'Subject')?.value || 'No subject';
      const from = headers.find((h: any) => h.name === 'From')?.value || '';
      const body = decodeEmailBody(full.data) || full.data.snippet || '';

      const parsed = await parseEmail({ subject, body, from });

      const clamp = (value: string | undefined, max: number) =>
        (value || '').trim().slice(0, max);

      const company = clamp(parsed.company_name, 255);
      const jobTitle = clamp(parsed.job_title, 255);
      const status = clamp(parsed.status || 'Applied', 50) || 'Applied';

      if (!company || !jobTitle) {
        skipped.push(msg.id);
        continue;
      }

      const applicationDate = full.data.internalDate
        ? new Date(parseInt(full.data.internalDate, 10)).toISOString()
        : new Date().toISOString();

      const existing = await pool.query(
        'SELECT id FROM applications WHERE user_id = $1 AND company_name = $2 AND job_title = $3 LIMIT 1',
        [user_id, company, jobTitle]
      );

      if (existing.rows.length > 0) {
        await pool.query(
          `UPDATE applications
           SET status = $1,
               application_date = $2,
               updated_at = NOW()
           WHERE id = $3`,
          [status, applicationDate, existing.rows[0].id]
        );
        updated += 1;
      } else {
        await pool.query(
          `INSERT INTO applications (user_id, company_name, job_title, status, source, application_date)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            user_id,
            company,
            jobTitle,
            status,
            'Email',
            applicationDate,
          ]
        );
        created += 1;
      }
    }

    res.json({
      message: 'Email sync completed',
      messagesChecked: messages.length,
      created,
      updated,
      skipped,
    });
  } catch (error) {
    console.error('Email sync error:', error);
    res.status(500).json({ error: 'Failed to sync emails' });
  }
});

const decodeEmailBody = (message: any): string => {
  const parts = message.payload?.parts || [];

  const findPart = (mime: string) => parts.find((p: any) => p.mimeType === mime);

  const decode = (data?: string) => {
    if (!data) return '';
    const normalized = data.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(normalized, 'base64').toString('utf-8');
  };

  const textPart = findPart('text/plain');
  const htmlPart = findPart('text/html');

  if (textPart?.body?.data) return decode(textPart.body.data);
  if (htmlPart?.body?.data) return decode(htmlPart.body.data);

  if (message.payload?.body?.data) return decode(message.payload.body.data);

  return '';
};

export default router;
