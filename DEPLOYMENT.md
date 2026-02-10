# Deployment Guide

This guide walks through preparing the Smart Job Application Tracker for production, pushing to Git, and deploying the frontend to Vercel. It also outlines how to host the backend and database so the deployed UI can communicate with the API.

## 1. Pre-Deployment Checklist

1. **Install dependencies**
   - `cd backend && npm install`
   - `cd ../frontend && npm install`
2. **Copy environment files**
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
3. **Set backend env values** in `backend/.env`
   - `PORT=5000`
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
   - `JWT_SECRET`
   - OAuth configs if Gmail/Outlook sync is required
   - Optional demo overrides: `DEMO_USER_EMAIL`, `DEMO_USER_PASSWORD`
4. **Set frontend env values** in `frontend/.env`
   - `REACT_APP_API_BASE_URL=https://<your-backend-domain>/api`
5. **Build & test locally** before pushing
   - Backend: `cd backend && npm run build`
   - Frontend: `cd frontend && npm run build`

## 2. Backend Hosting (Render/ Railway/ Fly.io + Supabase Database)

You can host the Express API anywhere Node 18 is supported. The example below assumes Render for the Node process **and Supabase for the PostgreSQL database**.

### 2.1 Provision Supabase Postgres

1. Create a new Supabase project at https://supabase.com.
2. In **Project Settings → Database**, copy the `Connection string` (Node.js or URI format). It contains host, port, database, user, and password.
3. Enable `Require SSL` (default in Supabase) and note that connections must use `?sslmode=require`.
4. Optional: in **Authentication → Users**, seed additional demo accounts or use SQL Editor to run inserts.

Update `backend/.env` to point at Supabase:

```
DB_HOST=<supabase-host>.supabase.co
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<generated-password>
DB_SSL=true
DATABASE_URL=postgresql://postgres:<password>@<host>.supabase.co:6543/postgres?sslmode=require
```

### 2.2 Deploy the Node Backend (example: Render)

1. **Provision a Web Service** using the backend directory:
   - Build command: `npm install && npm run build`
   - Start command: `npm run start`
2. **Configure environment variables** in the hosting dashboard using the Supabase values above plus the rest of `backend/.env`.
3. **Run database migrations** once the service can reach Supabase:
   - Via shell/Render job: `npm run migrate`
4. **Verify health**
   - Hit `https://<backend-domain>/health`
   - Test API via `curl https://<backend-domain>/api/auth/login`

> **Note:** Ensure outbound internet is allowed so OAuth/webhooks can execute. The backend automatically provisions the demo user based on the `DEMO_*` variables.

## 3. Frontend Hosting on Vercel

Because this repository is a monorepo, the Vercel CLI will use the configuration defined in `vercel.json`.

1. **Install the Vercel CLI (optional but recommended)**
   - `npm install -g vercel`
2. **Push all changes to GitHub/GitLab**
3. **Create a new Vercel project**
   - When prompted for the project root, Vercel will detect the monorepo setup via `vercel.json` and build the `frontend` package.
4. **Configure build settings**
   - Framework Preset: `Create React App`
   - Build command: `npm run build`
   - Output directory: `build`
5. **Set frontend environment variable**
   - `REACT_APP_API_BASE_URL=https://<backend-domain>/api`
6. **Deploy**
   - Vercel will install dependencies, run `npm run build`, and publish the static assets.
7. **Validate**
   - Open the assigned Vercel URL
   - Perform login with the demo credentials (or register a real account)
   - Navigate to `/demo` to confirm the preview loads without auth

## 4. Git & CI Tips

- Add `.env` files to `.gitignore` (already configured).
- Use feature branches and pull requests to keep `main` stable.
- Consider enabling Vercel preview deployments tied to pull requests for QA.
- Add a badge or deployment link to `README.md` once production is live.

## 5. Post-Deployment Smoke Test

1. `GET https://<backend-domain>/health` returns `{ status: "Server is running" }`
2. `POST https://<backend-domain>/api/auth/login` accepts demo credentials.
3. Frontend displays Demo page at `/demo` while logged out.
4. Signup/Login flows store tokens in `localStorage` and redirect to the dashboard.
5. Applications/Analytics routes render without console errors (may show empty states if DB is blank).

Following the above steps ensures that the repository is ready for Git hosting and the frontend can be deployed on Vercel with a reachable backend API.
