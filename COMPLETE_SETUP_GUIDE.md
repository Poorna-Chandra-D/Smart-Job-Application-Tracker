# 🚀 Complete Setup Guide
## Database + Email Integration + NLP Parsing

**Last Updated:** January 3, 2026  
**Status:** Step-by-step implementation guide

---

## 📋 Table of Contents

1. [Database Setup](#1-database-setup)
2. [Email Integration Setup](#2-email-integration-setup)
3. [NLP Email Parsing Setup](#3-nlp-email-parsing-setup)
4. [Testing & Verification](#4-testing--verification)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. Database Setup

### ✅ Step 1.1: Verify Docker Containers are Running

```bash
cd /Users/poornachandrad/Documents/Smart\ Job\ Application\ Tracker
docker ps
```

**Expected output:**
```
smartjobapplicationtracker-postgres-1   (Healthy)
smartjobapplicationtracker-backend-1    (Up)
smartjobapplicationtracker-frontend-1   (Up)
```

If containers are not running:
```bash
docker-compose up -d
```

---

### ✅ Step 1.2: Verify Database Schema

Check if all tables are created:

```bash
docker exec smartjobapplicationtracker-postgres-1 psql -U postgres -d job_tracker_db -c "\dt"
```

**Expected output:**
```
 applications
 email_accounts
 email_sync_log
 interviews
 notifications
 resumes
 users
```

---

### ✅ Step 1.3: Create a Test User (Optional)

Since we don't have authentication implemented yet, let's create a test user for future use:

```bash
docker exec smartjobapplicationtracker-postgres-1 psql -U postgres -d job_tracker_db -c "
INSERT INTO users (email, password_hash, first_name, last_name) 
VALUES ('test@example.com', '\$2b\$10\$dummyhash', 'Test', 'User') 
RETURNING id, email, first_name, last_name;"
```

Save the returned user ID - you'll need it for email integration.

---

### ✅ Step 1.4: Test Database Connection

Test the backend can connect:

```bash
curl http://localhost:5001/health
```

**Expected:** `{"status":"Server is running"}`

Test fetching applications:

```bash
curl http://localhost:5001/api/applications
```

**Expected:** `[]` (empty array) or list of applications

---

### ✅ Step 1.5: Add Sample Data (Optional)

Add a test application to verify everything works:

```bash
curl -X POST http://localhost:5001/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Google",
    "job_title": "Software Engineer",
    "status": "Applied",
    "application_date": "2026-01-03",
    "source": "LinkedIn"
  }'
```

**Verify the data was added:**

```bash
# Check database
docker exec smartjobapplicationtracker-postgres-1 psql -U postgres -d job_tracker_db -c "SELECT company_name, job_title, status FROM applications;"

# Check API returns data
curl http://localhost:5001/api/applications
```

**Troubleshooting: Data not showing in frontend?**

If you added data via curl but don't see it in the frontend at http://localhost:3000:

1. **Open browser console (F12)** and check for errors
2. **Verify API URL** - Look for console log: "API Base URL: http://localhost:5001/api"
3. **Hard refresh** the page: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
4. **Check Network tab** - Look for request to `/applications` and verify the response

If the console shows "API Base URL" different from `http://localhost:5001/api`, the frontend environment variable needs fixing:

```bash
# Check frontend environment
docker exec smartjobapplicationtracker-frontend-1 printenv | grep REACT_APP

# If incorrect, edit .env and restart
nano frontend/.env
# Ensure: REACT_APP_API_BASE_URL=http://localhost:5001/api
docker-compose restart frontend
```

**Quick Fix: Use frontend form instead**

If the API test works but frontend doesn't update, simply:
1. Open http://localhost:3000
2. Click "Add Application" button
3. Fill in the form manually
4. Click "Add Application" to submit
5. The new entry should appear immediately in the table

---

## 2. Email Integration Setup

### 📧 Gmail OAuth Setup

#### Step 2.1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Select a project" → "New Project"
   - Project name: "Job Tracker"
   - Click "Create"

3. **Enable Gmail API**
   - Go to "APIs & Services" → "Library"
   - Search for "Gmail API"
   - Click "Enable"

---

#### Step 2.2: Configure OAuth Consent Screen

1. **Navigate to OAuth consent screen**
   - Go to "APIs & Services" → "OAuth consent screen"

2. **Choose User Type**
   - Select "External" (for personal use)
   - Click "Create"

3. **Fill in App Information**
   - App name: `Job Application Tracker`
   - User support email: Your email
   - Developer contact: Your email
   - Click "Save and Continue"

4. **Add Scopes**
   - Click "Add or Remove Scopes"
   - Add these scopes:
     - `https://www.googleapis.com/auth/gmail.readonly`
     - `https://www.googleapis.com/auth/gmail.send`
     - `https://www.googleapis.com/auth/gmail.modify`
   - Click "Update" → "Save and Continue"

5. **Add Test Users** (for development)
   - Click "Add Users"
   - Add your email address
   - Click "Save and Continue"

---

#### Step 2.3: Create OAuth Credentials

1. **Navigate to Credentials**
   - Go to "APIs & Services" → "Credentials"

2. **Create OAuth Client ID**
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Job Tracker Web Client"

3. **Add Authorized Redirect URIs**
   ```
   http://localhost:5001/api/email/gmail/callback
   http://localhost:3000/oauth/callback
   ```

4. **Save and Copy Credentials**
   - Click "Create"
   - **IMPORTANT:** Copy the Client ID and Client Secret
   - Store them safely!

---

#### Step 2.4: Configure Backend Environment

Edit backend `.env` file:

```bash
cd /Users/poornachandrad/Documents/Smart\ Job\ Application\ Tracker/backend
nano .env
```

Add Gmail credentials:

```env
# Existing configuration...
NODE_ENV=development
PORT=5001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=job_tracker_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-secret-key-change-this-in-production

# Add these Gmail OAuth credentials
GMAIL_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret-here
GMAIL_REDIRECT_URI=http://localhost:5001/api/email/gmail/callback

# NLP and AI (add later)
OPENAI_API_KEY=your-openai-key-here
```

Save and exit (Ctrl+X, then Y, then Enter)

---

### 📧 Outlook OAuth Setup (Optional)

#### Step 2.5: Create Microsoft Azure App

1. **Go to Azure Portal**
   - Visit: https://portal.azure.com/
   - Sign in with Microsoft account

2. **Register Application**
   - Go to "Azure Active Directory" → "App registrations"
   - Click "New registration"
   - Name: "Job Application Tracker"
   - Supported account types: "Accounts in any organizational directory and personal Microsoft accounts"
   - Redirect URI: Web → `http://localhost:5001/api/email/outlook/callback`
   - Click "Register"

3. **Copy Application (client) ID**
   - You'll see it on the Overview page
   - Save this as `OUTLOOK_CLIENT_ID`

4. **Create Client Secret**
   - Go to "Certificates & secrets" → "Client secrets"
   - Click "New client secret"
   - Description: "Job Tracker Secret"
   - Expires: 24 months
   - Click "Add"
   - **IMPORTANT:** Copy the Value immediately (you can't see it again!)
   - Save as `OUTLOOK_CLIENT_SECRET`

5. **Add API Permissions**
   - Go to "API permissions" → "Add a permission"
   - Select "Microsoft Graph"
   - Select "Delegated permissions"
   - Add these permissions:
     - `Mail.Read`
     - `Mail.Send`
     - `User.Read`
   - Click "Add permissions"
   - Click "Grant admin consent"

6. **Add to Backend .env**
   ```env
   OUTLOOK_CLIENT_ID=your-outlook-client-id
   OUTLOOK_CLIENT_SECRET=your-outlook-client-secret
   OUTLOOK_REDIRECT_URI=http://localhost:5001/api/email/outlook/callback
   ```

---

#### Step 2.6: Restart Backend with New Credentials

```bash
cd /Users/poornachandrad/Documents/Smart\ Job\ Application\ Tracker
docker-compose restart backend
```

Verify backend loaded credentials:

```bash
docker logs smartjobapplicationtracker-backend-1 | grep "Server running"
```

---

## 3. NLP Email Parsing Setup

### 🤖 Step 3.1: Get OpenAI API Key

1. **Create OpenAI Account**
   - Visit: https://platform.openai.com/
   - Sign up or log in

2. **Get API Key**
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Name it: "Job Tracker"
   - **IMPORTANT:** Copy the key immediately
   - Store it safely!

3. **Add Credits (if needed)**
   - Go to "Billing" → "Add payment method"
   - Add a credit card
   - Note: OpenAI charges per usage (around $0.002 per email)

---

### 🤖 Step 3.2: Configure OpenAI in Backend

Edit backend `.env`:

```bash
nano /Users/poornachandrad/Documents/Smart\ Job\ Application\ Tracker/backend/.env
```

Add OpenAI key:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

---

### 🤖 Step 3.3: Implement Email Service (Already Created)

The email service is already implemented in:
- `backend/src/services/emailService.ts` - Email parsing logic
- `backend/src/services/gmailService.ts` - Gmail API integration

Key features:
- ✅ Extracts company names from emails
- ✅ Identifies job titles
- ✅ Detects application status
- ✅ Finds application links
- ✅ Determines source (email, LinkedIn, etc.)

---

### 🤖 Step 3.4: Configure NLP Settings

Create `backend/src/config/nlp.ts`:

```typescript
export const NLP_CONFIG = {
  // Keywords for identifying job application emails
  jobKeywords: [
    'application', 'position', 'role', 'opportunity', 'job',
    'interview', 'hiring', 'recruiter', 'career', 'opening'
  ],
  
  // Status detection keywords
  statusKeywords: {
    'Applied': ['submitted', 'application received', 'applied'],
    'Interview Scheduled': ['interview', 'meet', 'call', 'zoom'],
    'Rejected': ['regret', 'unfortunately', 'not moving forward', 'not selected'],
    'Offer': ['offer', 'congratulations', 'pleased to offer'],
  },
  
  // Email sources to monitor
  emailSources: [
    'linkedin.com',
    'indeed.com',
    'glassdoor.com',
    'greenhouse.io',
    'lever.co',
    'workday.com'
  ]
};
```

---

### 🤖 Step 3.5: Restart Services

```bash
cd /Users/poornachandrad/Documents/Smart\ Job\ Application\ Tracker
docker-compose restart backend
```

---

## 4. Testing & Verification

### ✅ Step 4.1: Test Database

```bash
# Check all tables exist
docker exec smartjobapplicationtracker-postgres-1 psql -U postgres -d job_tracker_db -c "\dt"

# Check applications table
docker exec smartjobapplicationtracker-postgres-1 psql -U postgres -d job_tracker_db -c "SELECT * FROM applications;"

# Check email_accounts table
docker exec smartjobapplicationtracker-postgres-1 psql -U postgres -d job_tracker_db -c "SELECT * FROM email_accounts;"
```

---

### ✅ Step 4.2: Test Email Integration

1. **Test Gmail OAuth Flow**
   ```bash
   curl http://localhost:5001/api/email/gmail
   ```
   
   **Expected:** JSON with authorization URL
   
   Copy the URL and open in browser to authorize

2. **Test Email Sync Endpoint**
   ```bash
   curl -X POST http://localhost:5001/api/email/sync \
     -H "Content-Type: application/json" \
     -d '{"user_id": 1}'
   ```

3. **Verify Email Accounts**
   ```bash
   docker exec smartjobapplicationtracker-postgres-1 psql -U postgres -d job_tracker_db -c "SELECT provider, email, is_active FROM email_accounts;"
   ```

---

### ✅ Step 4.3: Test NLP Parsing

Create a test script `backend/test-nlp.ts`:

```typescript
import { emailService } from './src/services/emailService';

const testEmail = {
  subject: 'Your Application to Google - Software Engineer',
  body: `
    Dear Candidate,
    
    Thank you for applying to the Software Engineer position at Google.
    We have received your application and will review it shortly.
    
    You can track your application here: https://careers.google.com/jobs/123
    
    Best regards,
    Google Recruiting Team
  `,
  from: 'recruiting@google.com'
};

async function testParsing() {
  const result = await emailService.parseEmail(testEmail);
  console.log('Parsed Application:', JSON.stringify(result, null, 2));
}

testParsing();
```

Run test:

```bash
cd backend
npx ts-node test-nlp.ts
```

**Expected output:**
```json
{
  "company_name": "Google",
  "job_title": "Software Engineer",
  "status": "Applied",
  "application_link": "https://careers.google.com/jobs/123",
  "source": "Email"
}
```

---

### ✅ Step 4.4: Test Frontend

1. **Open Application**
   - Visit: http://localhost:3000

2. **Test Adding Applications**
   - Click "Add Application"
   - Fill in form
   - Submit
   - Verify it appears in table

3. **Test Email Settings**
   - Go to Settings page
   - Click "Connect Gmail Account"
   - Complete OAuth flow
   - Verify connection status

4. **Test Email Sync**
   - Click "Sync Emails Now"
   - Check Applications page for new entries

---

## 5. Troubleshooting

### 🔧 Database Issues

**Problem:** Cannot connect to database

```bash
# Check container is running
docker ps | grep postgres

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker logs smartjobapplicationtracker-postgres-1

# Test connection
docker exec smartjobapplicationtracker-postgres-1 psql -U postgres -c "SELECT 1"
```

---

### 🔧 Gmail OAuth Issues

**Problem:** "redirect_uri_mismatch" error

**Solution:**
1. Go to Google Cloud Console → Credentials
2. Edit OAuth 2.0 Client
3. Add exact redirect URI: `http://localhost:5001/api/email/gmail/callback`
4. Save and wait 5 minutes for changes to propagate

**Problem:** "Access blocked: Job Tracker has not completed verification"

**Solution:**
1. Go to OAuth consent screen
2. Click "Publish App" (for testing, stay in Testing mode)
3. Add your email to Test Users list

---

### 🔧 NLP Parsing Issues

**Problem:** OpenAI API errors

```bash
# Check backend logs
docker logs smartjobapplicationtracker-backend-1 | grep -i openai

# Verify API key is loaded
docker exec smartjobapplicationtracker-backend-1 printenv | grep OPENAI
```

**Problem:** Poor parsing accuracy

**Solution:** Fine-tune the prompts in `backend/src/services/emailService.ts`:

```typescript
const prompt = `
Extract job application details from this email.
Focus on: company name, job title, status, and links.

Email Subject: ${subject}
Email Body: ${body}

Return JSON only with these fields:
- company_name (string)
- job_title (string)
- status (one of: Applied, Interview Scheduled, Rejected, Offer)
- application_link (URL or null)
- source (string)
`;
```

---

### 🔧 Port Conflicts

**Problem:** Port 5001 already in use

```bash
# Find process
lsof -i :5001

# Kill process
kill -9 <PID>

# Or change backend port
nano backend/.env
# Change PORT=5001 to PORT=5002
```

---

## 📊 Quick Reference

### Useful Commands

```bash
# View all containers
docker-compose ps

# View logs
docker-compose logs -f

# Restart everything
docker-compose restart

# Stop everything
docker-compose down

# Start fresh
docker-compose down -v && docker-compose up -d

# Access database directly
docker exec -it smartjobapplicationtracker-postgres-1 psql -U postgres -d job_tracker_db

# Check backend environment
docker exec smartjobapplicationtracker-backend-1 printenv

# Rebuild containers
docker-compose up -d --build
```

---

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/applications` | GET | List all applications |
| `/api/applications` | POST | Create application |
| `/api/applications/:id` | PUT | Update application |
| `/api/email/gmail` | GET | Gmail OAuth URL |
| `/api/email/outlook` | GET | Outlook OAuth URL |
| `/api/email/sync` | POST | Sync emails |
| `/api/analytics/summary` | GET | Dashboard stats |

---

### Database Tables

| Table | Purpose |
|-------|---------|
| `users` | User accounts |
| `applications` | Job applications |
| `interviews` | Interview schedules |
| `email_accounts` | Connected email accounts |
| `email_sync_log` | Email sync history |
| `resumes` | Resume tracking |
| `notifications` | User notifications |

---

## 🎉 Success Checklist

Mark each when completed:

### Database Setup
- [ ] Docker containers running
- [ ] Database tables created
- [ ] Test user created
- [ ] Sample application added
- [ ] API endpoints tested

### Email Integration
- [ ] Google Cloud project created
- [ ] Gmail API enabled
- [ ] OAuth credentials obtained
- [ ] Backend .env configured
- [ ] OAuth flow tested

### NLP Parsing
- [ ] OpenAI API key obtained
- [ ] Backend configured with key
- [ ] Email service tested
- [ ] Parsing accuracy verified
- [ ] Sample email parsed successfully

### Frontend
- [ ] Application loads at localhost:3000
- [ ] Can add applications manually
- [ ] Settings page accessible
- [ ] Email connection works
- [ ] Sync button functions

---

## 📞 Need Help?

### Check Logs First
```bash
# Backend
docker logs smartjobapplicationtracker-backend-1

# Frontend
docker logs smartjobapplicationtracker-frontend-1

# Database
docker logs smartjobapplicationtracker-postgres-1
```

### Common Solutions

1. **Clear browser cache and cookies**
2. **Restart Docker containers**: `docker-compose restart`
3. **Check environment variables are set**
4. **Verify OAuth redirect URIs match exactly**
5. **Ensure API keys are valid and active**

---

## 🚀 Next Steps After Setup

1. **Connect Your Email Account**
   - Go to Settings → Connect Gmail/Outlook
   - Complete OAuth flow

2. **Sync Your Emails**
   - Click "Sync Emails Now"
   - Wait for NLP processing
   - Review parsed applications

3. **Customize Tracking**
   - Add custom statuses
   - Set up notifications
   - Configure interview reminders

4. **Explore Analytics**
   - View application trends
   - Track interview success rate
   - Monitor response times

---

**Setup Complete!** 🎊

Your Smart Job Application Tracker is now fully configured with:
- ✅ Database running in Docker
- ✅ Email integration (Gmail/Outlook)
- ✅ NLP email parsing
- ✅ Full-stack application ready

**Access your app:** http://localhost:3000

---

*Last Updated: January 3, 2026*  
*All systems operational* ✅
