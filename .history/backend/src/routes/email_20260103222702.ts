import express, { Request, Response } from 'express';
import { google } from 'googleapis';
import pool from '../db';

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
    
    // Store in database
    const result = await pool.query(
      `INSERT INTO email_accounts (user_id, email, provider, access_token, refresh_token, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id, email) 
       DO UPDATE SET access_token = $4, refresh_token = $5, expires_at = $6, updated_at = NOW()
       RETURNING *`,
      [
        1, // Default user_id
        profile.data.emailAddress,
        'gmail',
        tokens.access_token,
        tokens.refresh_token,
        tokens.expiry_date ? new Date(tokens.expiry_date) : null
      ]
    );

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
    const { user_id = 1 } = req.body;

    // Get email account
    const accountResult = await pool.query(
      'SELECT * FROM email_accounts WHERE user_id = $1 AND provider = $2',
      [user_id, 'gmail']
    );

    if (accountResult.rows.length === 0) {
      return res.status(404).json({ error: 'Gmail account not connected' });
    }

    const account = accountResult.rows[0];

    // Set credentials
    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Get recent emails
    const messages = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 50,
      q: 'subject:(application OR interview OR offer OR position)'
    });

    const parsedCount = messages.data.messages?.length || 0;

    res.json({
      message: 'Email sync completed',
      emailsParsed: parsedCount
    });
  } catch (error) {
    console.error('Email sync error:', error);
    res.status(500).json({ error: 'Failed to sync emails' });
  }
});

export default router;
