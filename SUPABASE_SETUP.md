# Step 2 Prerequisite: Setup Supabase Database

Before deploying to Render, you need a PostgreSQL database. This guide uses Supabase (free tier available).

---

## Create Supabase Project

### Step 1: Sign Up / Login

1. Go to https://supabase.com
2. Sign up with GitHub, Google, or email
3. Verify your email if needed

### Step 2: Create a New Project

1. Click **"New Project"** or **"Create New Project"**
2. Fill in the form:

| Field | Value |
|-------|-------|
| **Project Name** | `smart-job-tracker` |
| **Database Password** | Generate strong password (save this!) |
| **Region** | Choose closest to your users |
| **Pricing Plan** | `Free` (sufficient for development/demo) |

3. Click **"Create new project"**
4. Wait 2-3 minutes for database initialization

### Step 3: Get Database Credentials

Once created, go to **Project Settings** → **Database**:

You'll see:

```
Host: <something>.supabase.co
Port: 6543
Database: postgres
User: postgres
Password: <the-password-you-set>
```

### Step 4: Get Connection String

Supabase provides a connection string. On the same page, look for **"Connection String"**:

```
postgresql://postgres:<password>@<host>.supabase.co:6543/postgres?sslmode=require
```

**Copy this entire string** - you'll need it for Render environment variables.

### Step 5: Test Connection (Optional)

If you have `psql` installed locally, test the connection:

```bash
psql postgresql://postgres:<password>@<host>.supabase.co:6543/postgres?sslmode=require
```

If it connects, you'll see a `postgres=>` prompt. Type `\q` to exit.

---

## Important Security Notes

✅ **DO:**
- Save the password securely (use a password manager)
- Use SSL connection (sslmode=require in connection string)
- Set environment variables on Render, not in code

❌ **DON'T:**
- Commit `.env` files with credentials to Git
- Share connection strings publicly
- Use weak passwords

---

## What Gets Created

Supabase creates:

- PostgreSQL 15 database
- Real-time capabilities (for future features)
- Authentication module (optional)
- API layer (optional, we use Express instead)

Your migrations will create tables:
- `users` - User accounts
- `applications` - Job applications
- `interviews` - Interview tracking
- `resumes` - Resume versions
- `email_accounts` - Connected email accounts

---

## Next: Deploy Backend on Render

Once you have the database credentials:

1. Open [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
2. Create Web Service on Render
3. Add Supabase credentials as environment variables
4. Deploy backend

---

## Free Tier Limits

Supabase Free tier includes:

- 500 MB storage
- Up to 2 concurrent connections
- 1 GB bandwidth
- Perfect for development and testing

Upgrade anytime if needed for production.
