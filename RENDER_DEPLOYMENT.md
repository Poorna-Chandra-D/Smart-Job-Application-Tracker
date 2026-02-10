# Step 2: Deploy Backend on Render

This guide walks you through deploying the Smart Job Application Tracker backend on Render with a Supabase PostgreSQL database.

---

## Prerequisites

- Supabase project created with PostgreSQL database
- GitHub repository pushed (already done ✅)
- Render account at https://render.com

---

## Deployment Steps

### Step 1: Create a Web Service on Render

1. Go to **https://render.com/dashboard**
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy an existing repository"**
4. Connect your GitHub account if not already done
5. Search for and select: `Smart-Job-Application-Tracker`
6. Click **"Connect"**

### Step 2: Configure the Web Service

Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | `smart-job-tracker-backend` (or your preference) |
| **Environment** | `Node` |
| **Region** | `Oregon (us-west)` or closest to you |
| **Branch** | `main` |
| **Build Command** | `cd backend && npm install && npm run build` |
| **Start Command** | `cd backend && npm start` |

### Step 3: Add Environment Variables

In Render dashboard, go to **"Environment"** section and add these variables:

```bash
# Database (from Supabase)
DB_HOST=<your-supabase-host>.supabase.co
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<your-supabase-password>
DB_SSL=true

# JWT Secret (generate a strong random string)
JWT_SECRET=<generate-strong-random-string>

# Node environment
NODE_ENV=production

# Optional: OAuth (if implementing email sync)
GMAIL_CLIENT_ID=<your-gmail-client-id>
GMAIL_CLIENT_SECRET=<your-gmail-client-secret>
GMAIL_REDIRECT_URI=https://<your-render-domain>/api/auth/gmail/callback

OUTLOOK_CLIENT_ID=<optional>
OUTLOOK_CLIENT_SECRET=<optional>
OUTLOOK_REDIRECT_URI=https://<your-render-domain>/api/auth/outlook/callback

# Optional: OpenAI (for NLP parsing)
OPENAI_API_KEY=<optional>

# Demo User (auto-seeded)
DEMO_USER_EMAIL=demo@jobtracker.com
DEMO_USER_PASSWORD=demo123!
DEMO_USER_FIRST_NAME=Demo
DEMO_USER_LAST_NAME=User
```

### Step 4: Generate a Strong JWT_SECRET

Run this command locally to generate a secure random string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it into `JWT_SECRET` environment variable on Render.

### Step 5: Create the Web Service

1. Scroll down and click **"Create Web Service"**
2. Render will start building your backend
3. Wait for the build to complete (usually 2-3 minutes)
4. You'll see a green status when deployment is successful

### Step 6: Verify Deployment

Once deployed, you'll see a URL like: `https://smart-job-tracker-backend.onrender.com`

Test your backend:

```bash
# Test health endpoint
curl https://smart-job-tracker-backend.onrender.com/health

# Expected response:
# {"status":"Server is running"}
```

---

## Step 7: Run Database Migrations

Once the backend is deployed and connected to Supabase, run migrations to create the database schema:

### Option A: Via Render Shell (Recommended)

1. In Render dashboard, go to your Web Service
2. Click the **"Shell"** tab
3. Run:
   ```bash
   npm run migrate
   ```
4. Wait for migrations to complete
5. Check for confirmation: "Demo user ready: demo@jobtracker.com"

### Option B: From Local Machine

```bash
cd backend
DATABASE_URL=postgresql://postgres:<password>@<host>.supabase.co:6543/postgres?sslmode=require npm run migrate
```

---

## Step 8: Get Your Backend URL

After successful deployment, copy your backend domain:

```
https://smart-job-tracker-backend.onrender.com
```

This URL will be used in Step 1 (Vercel Frontend) when setting `REACT_APP_API_BASE_URL`.

---

## Troubleshooting

### Build Failed
- Check backend/package.json exists with correct build/start scripts
- Verify Node version compatibility (18+)
- Check all dependencies in backend/package.json are listed

### Database Connection Error
- Verify Supabase credentials are correct
- Ensure Supabase allows SSL connections (check firewall rules)
- Test connection locally: `psql postgresql://postgres:<password>@<host>:6543/postgres?sslmode=require`

### Migration Failed
- Ensure database is reachable from Render
- Check migrations in `backend/migrations/` folder exist
- Run migrations via Render Shell tab

### 502 Bad Gateway After Deploy
- Check Render logs: Dashboard → Logs tab
- Likely a runtime error; verify all env vars are set
- Restart the service

---

## Next Steps

✅ Backend deployed on Render  
➡️ **Step 1**: Create Vercel project for frontend  
➡️ **Step 3**: (Already done - Supabase database provisioned)

Once backend is live, return to deploy frontend on Vercel.
