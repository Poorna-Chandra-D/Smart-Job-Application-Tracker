# Environment Setup Guide for Production

## Backend Environment (.env or .env.production)

```bash
# Node environment
NODE_ENV=production

# Server port (Render/Railway will override via PORT env var)
PORT=5000

# === SUPABASE DATABASE ===
# Get these from Supabase Project Settings → Database
DB_HOST=your-project.supabase.co
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<your-supabase-password>
DB_SSL=true
DATABASE_URL=postgresql://postgres:<password>@your-project.supabase.co:6543/postgres?sslmode=require

# === JWT SECRET ===
# Generate a strong random string for production (e.g., use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=<generate-strong-random-string>

# === GMAIL OAUTH (optional, for email sync) ===
GMAIL_CLIENT_ID=<from-google-cloud-console>
GMAIL_CLIENT_SECRET=<from-google-cloud-console>
GMAIL_REDIRECT_URI=https://<backend-domain>/api/auth/gmail/callback

# === OUTLOOK OAUTH (optional) ===
OUTLOOK_CLIENT_ID=<from-azure-app-registration>
OUTLOOK_CLIENT_SECRET=<from-azure-app-registration>
OUTLOOK_REDIRECT_URI=https://<backend-domain>/api/auth/outlook/callback

# === OPENAI (optional, for NLP parsing) ===
OPENAI_API_KEY=<your-openai-api-key>

# === SMTP (optional, for email notifications) ===
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your-email@gmail.com>
SMTP_PASSWORD=<app-specific-password>

# === DEMO USER (auto-seeded on startup) ===
DEMO_USER_EMAIL=demo@jobtracker.com
DEMO_USER_PASSWORD=demo123!
DEMO_USER_FIRST_NAME=Demo
DEMO_USER_LAST_NAME=User
```

## Frontend Environment (.env or .env.production)

```bash
# Backend API URL (set in Vercel environment variables)
REACT_APP_API_BASE_URL=https://<backend-domain>/api

# OAuth Client IDs (if integrating with frontend OAuth buttons)
REACT_APP_GMAIL_CLIENT_ID=<from-google-cloud-console>
REACT_APP_OUTLOOK_CLIENT_ID=<from-azure-app-registration>
```

## How to Generate a Strong JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste into `JWT_SECRET`.

## Vercel Frontend Deployment

In Vercel dashboard:
1. Go to **Project Settings → Environment Variables**
2. Add: `REACT_APP_API_BASE_URL=https://<backend-domain>/api`
3. Apply to all environments (Production, Preview, Development)
4. Trigger redeploy

## Supabase Connection Test

```bash
# In backend/ directory, verify connection:
DATABASE_URL=postgresql://... npm run migrate
```

If migrations run successfully, your database is reachable.
