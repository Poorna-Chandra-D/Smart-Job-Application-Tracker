# 🚀 How to Run - Complete Instructions

## Your System Status ✅
- **Node.js**: v20.17.0 ✅
- **npm**: v10.8.2 ✅
- **Backend Dependencies**: Installed ✅
- **Frontend Dependencies**: Installed ✅
- **Environment Files**: Created ✅

---

## Choose Your Startup Method

### Method 1: Docker Compose 🐳 (EASIEST - Recommended)

**Prerequisites:**
- Docker Desktop installed (free download)

**Steps:**
```bash
# 1. Navigate to project
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"

# 2. Start everything
docker-compose up -d

# 3. Open in browser
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

**View Logs:**
```bash
docker-compose logs -f backend    # Backend logs
docker-compose logs -f frontend   # Frontend logs
docker-compose logs -f postgres   # Database logs
```

**Stop Services:**
```bash
docker-compose down
```

**Pros:**
- ✅ Starts backend, frontend, AND database
- ✅ No manual database setup needed
- ✅ All services isolated in containers
- ✅ Easy to manage

**Cons:**
- ⚠️ Requires Docker (free)
- ⚠️ Slightly larger resource usage

---

### Method 2: Quick-Start Script 🚀 (GUIDED)

**Steps:**
```bash
# 1. Navigate to project
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"

# 2. Run interactive script
./quick-start.sh

# 3. Follow prompts and choose your method
```

**Pros:**
- ✅ Guides you step by step
- ✅ Auto-detects Docker availability
- ✅ Checks all dependencies
- ✅ Easy for beginners

**Cons:**
- ⚠️ Still needs PostgreSQL for method 2

---

### Method 3: Manual Start 💻 (FULL CONTROL)

**Prerequisites:**
- PostgreSQL installed locally

**Step 1: Start Backend (Terminal 1)**
```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"/backend
npm run dev
```

**Expected Output:**
```
Server running on port 5000
```

**Step 2: Start Frontend (Terminal 2)**
```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"/frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view job-tracker-frontend in the browser.
Local: http://localhost:3000
```

**Step 3: Open Browser**
```
http://localhost:3000
```

**Pros:**
- ✅ Full control over each service
- ✅ See real-time logs
- ✅ Can restart individual services
- ✅ Better for development

**Cons:**
- ⚠️ Need PostgreSQL installed
- ⚠️ More terminal windows to manage
- ⚠️ Manual database setup needed

---

## Step-by-Step Setup for Method 3 (Local Development)

### 1. Setup PostgreSQL

**macOS (using Homebrew):**
```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL
brew services start postgresql@15

# Create database
createdb job_tracker_db

# Verify
psql -d job_tracker_db -c "SELECT 1"
```

**macOS (using DMG):**
- Download from: https://www.postgresql.org/download/macosx/
- Follow installer
- Create database manually

**Windows:**
- Download installer: https://www.postgresql.org/download/windows/
- Run installer and follow wizard
- Create database using pgAdmin

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
createdb job_tracker_db
```

### 2. Configure Backend

**Edit `backend/.env`:**
```bash
# Using macOS/Linux default credentials
DB_HOST=localhost
DB_PORT=5432
DB_NAME=job_tracker_db
DB_USER=postgres
DB_PASSWORD=postgres  # or your chosen password
```

### 3. Run Database Schema

```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"/backend

# Option A: Using migration command
npm run migrate

# Option B: Using psql directly
psql -U postgres -d job_tracker_db < migrations/001_initial_schema.sql
```

### 4. Verify Database

```bash
psql -U postgres -d job_tracker_db

# In psql prompt:
\dt        # Show all tables (should list users, applications, interviews, etc.)
\q         # Quit psql
```

### 5. Start Services

**Terminal 1 - Backend:**
```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"/frontend
npm start
```

**Browser:**
```
http://localhost:3000
```

---

## Verification Checklist

### Backend Health
```bash
# Check if backend is running
curl http://localhost:5000/health

# Should return:
# {"status":"Server is running"}
```

### Frontend Check
- Open http://localhost:3000 in browser
- Should see navigation sidebar
- Should see Dashboard with metric cards

### Database Check
```bash
# Connect to database
psql -U postgres -d job_tracker_db

# List tables
\dt

# Count applications
SELECT COUNT(*) FROM applications;

# Quit
\q
```

---

## API Testing

### Using curl
```bash
# Get all applications
curl http://localhost:5000/api/applications

# Create new application
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Google",
    "job_title": "Senior Engineer",
    "status": "Applied",
    "source": "LinkedIn"
  }'

# Get analytics
curl http://localhost:5000/api/analytics/summary
```

### Using Postman
1. Download Postman: https://www.postman.com/downloads/
2. Create requests for each endpoint
3. Set Content-Type to application/json
4. Test API responses

---

## Troubleshooting

### "Port 5000 already in use"
```bash
# Find process using port 5000
lsof -ti:5000

# Kill it
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or set environment variable
PORT=3001 npm start
```

### "Cannot connect to database"
```bash
# Check if PostgreSQL is running
psql -U postgres

# Check database exists
psql -U postgres -l

# Create if missing
psql -U postgres -c "CREATE DATABASE job_tracker_db"

# Run migrations
npm run migrate
```

### "Module not found" errors
```bash
# Reinstall dependencies
cd backend && rm -rf node_modules package-lock.json
npm install

cd ../frontend && rm -rf node_modules package-lock.json
npm install
```

### "EACCES: permission denied" (on Linux/macOS)
```bash
# Make scripts executable
chmod +x /Users/poornachandrad/Documents/"Smart Job Application Tracker"/quick-start.sh

# Or use sudo
sudo npm install
```

---

## Environment Variables Reference

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=job_tracker_db
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Secret (change in production!)
JWT_SECRET=your_very_secure_secret_here_change_this

# Gmail OAuth
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REDIRECT_URI=http://localhost:5000/api/auth/gmail/callback

# Outlook OAuth
OUTLOOK_CLIENT_ID=your_outlook_client_id
OUTLOOK_CLIENT_SECRET=your_outlook_client_secret
OUTLOOK_REDIRECT_URI=http://localhost:5000/api/auth/outlook/callback

# OpenAI (for NLP)
OPENAI_API_KEY=your_openai_api_key

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
PUBLIC_URL=/
```

---

## Next Steps After Running

1. **Test Dashboard** - Visit http://localhost:3000
2. **Create Sample Application** - Add a test job application
3. **Check API** - Test endpoints at http://localhost:5000/api
4. **Setup Database** - Run migrations if not auto-created
5. **Configure OAuth** - Add Gmail/Outlook credentials for email integration
6. **Build Features** - Implement the features listed in roadmap

---

## Quick Reference

| Task | Command |
|------|---------|
| Start all (Docker) | `docker-compose up -d` |
| Stop all (Docker) | `docker-compose down` |
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm start` |
| View Docker logs | `docker-compose logs -f` |
| Check API health | `curl http://localhost:5000/health` |
| Install dependencies | `npm install` |
| Run migrations | `npm run migrate` |
| Build for production | `npm run build` |

---

## Support Resources

- **Setup Guide**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Project Status**: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- **Main README**: [README.md](README.md)
- **Project Structure**: See each folder's files

---

**Ready? Choose your method above and get started! 🎉**
