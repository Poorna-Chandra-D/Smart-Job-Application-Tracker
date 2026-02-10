# Deployment Checklist: From Code to Production (30 min)

Follow these steps in order to deploy your Smart Job Application Tracker.

---

## 📋 Checklist Overview

- [ ] **Step 1**: Setup Supabase Database (5 min)
- [ ] **Step 2**: Deploy Backend on Render (10 min)
- [ ] **Step 3**: Deploy Frontend on Vercel (5 min)
- [ ] **Step 4**: Smoke Test (5 min)
- [ ] **Step 5**: Optional - Setup Custom Domain

---

## Step 1️⃣ Setup Supabase Database (5 min)

**File**: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

- [ ] Create account at https://supabase.com
- [ ] Create new project (free tier)
- [ ] Copy database credentials:
  - Host: `_______________`
  - Password: `_______________`
  - Connection String: `postgresql://...`

**Save credentials somewhere safe!** You'll need them in Step 2.

---

## Step 2️⃣ Deploy Backend on Render (10 min)

**File**: [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

### Render Setup

- [ ] Create Render account at https://render.com
- [ ] Click "New Web Service"
- [ ] Connect GitHub repo: `Smart-Job-Application-Tracker`
- [ ] Configure:
  - Build: `cd backend && npm install && npm run build`
  - Start: `cd backend && npm start`

### Environment Variables (Add to Render)

```bash
# Copy from Supabase
DB_HOST=<from-supabase>
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<from-supabase>
DB_SSL=true

# Generate new JWT Secret using:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=<generate-using-command-above>

# Keep these
NODE_ENV=production
DEMO_USER_EMAIL=demo@jobtracker.com
DEMO_USER_PASSWORD=demo123!
```

### Deploy & Test

- [ ] Click "Create Web Service"
- [ ] Wait for build (2-3 min)
- [ ] Copy backend URL: `https://smart-job-tracker-backend.onrender.com`
- [ ] Test health: `curl https://<url>/health`
- [ ] Run migrations via Render Shell: `npm run migrate`

**✅ Backend is now live!**

---

## Step 3️⃣ Deploy Frontend on Vercel (5 min)

### Vercel Setup

- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New..." → "Project"
- [ ] Import repo: `Smart-Job-Application-Tracker`
- [ ] Vercel auto-detects `vercel.json` ✅

### Environment Variable

- [ ] Go to Project Settings → Environment Variables
- [ ] Add:
  ```
  REACT_APP_API_BASE_URL=https://<backend-domain>/api
  ```
  (Replace `<backend-domain>` with URL from Step 2, e.g., `smart-job-tracker-backend.onrender.com`)

### Deploy

- [ ] Click "Deploy"
- [ ] Wait for build (1-2 min)
- [ ] Vercel gives you a URL: `https://smart-job-tracker...vercel.app`

**✅ Frontend is now live!**

---

## Step 4️⃣ Smoke Test (5 min)

### Test the Complete Flow

1. **Open frontend URL** (from Vercel)
2. **Visit `/demo` page**
   - [ ] Demo landing page loads without login ✅
   - [ ] Feature showcase displays
   - [ ] CTA buttons visible

3. **Click "Start Free Trial" or "Create my workspace"**
   - [ ] Redirects to `/signup` ✅
   - [ ] Form loads

4. **Click "Log in here"**
   - [ ] Redirects to `/login` ✅
   - [ ] Form loads

5. **Use Demo Credentials**
   - [ ] Email: `demo@jobtracker.com`
   - [ ] Password: `demo123!`
   - [ ] Click "Sign in"
   - [ ] Verifies with backend ✅
   - [ ] Gets JWT token ✅
   - [ ] Redirects to dashboard `/` ✅

6. **Dashboard Page**
   - [ ] Loads without errors ✅
   - [ ] Can navigate to Applications/Analytics ✅

7. **Check Backend Connection**
   - [ ] Open browser DevTools (F12)
   - [ ] Go to Network tab
   - [ ] Refresh page
   - [ ] Look for API calls to `/api/...`
   - [ ] All requests return 200 or 201 ✅

---

## Step 5️⃣ Optional: Custom Domain

If you have a domain:

### Vercel Custom Domain

1. Go to Vercel Project Settings
2. Add custom domain (e.g., `jobtracker.yoursite.com`)
3. Update DNS records per Vercel instructions

### Render Custom Domain

1. Go to Render Web Service Settings
2. Add custom domain (e.g., `api.jobtracker.yoursite.com`)
3. Update DNS records

---

## 🎉 You're Done!

Your Smart Job Application Tracker is now:

✅ **Live on Vercel**: `https://smart-job-tracker...vercel.app`  
✅ **API Running on Render**: `https://smart-job-tracker-backend.onrender.com`  
✅ **Database on Supabase**: PostgreSQL 15  
✅ **Demo Credentials**: Ready for testing  

---

## Troubleshooting Quick Links

| Issue | Fix |
|-------|-----|
| Backend 502 error | Check Render logs, verify env vars |
| Frontend blank page | Check REACT_APP_API_BASE_URL env var |
| Login fails | Verify backend `/health` endpoint works |
| Database connection error | Check Supabase credentials, SSL enabled |

---

## Environment Variables Reference

### Backend (Render)

```
DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_SSL
JWT_SECRET, NODE_ENV
DEMO_USER_EMAIL, DEMO_USER_PASSWORD, DEMO_USER_FIRST_NAME, DEMO_USER_LAST_NAME
(Optional) GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, etc.
```

### Frontend (Vercel)

```
REACT_APP_API_BASE_URL
(Optional) REACT_APP_GMAIL_CLIENT_ID, REACT_APP_OUTLOOK_CLIENT_ID
```

---

## Support Guides

- 📖 [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Database setup
- 🚀 [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) - Backend deployment
- 📚 [DEPLOYMENT.md](DEPLOYMENT.md) - General deployment guide
- 🔑 [ENV-SETUP.md](ENV-SETUP.md) - Environment variable reference

---

**Estimated Time: 30 minutes**  
**Cost: Free (Supabase + Render + Vercel free tiers)**

Good luck! 🚀
