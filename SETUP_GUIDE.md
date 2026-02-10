# 🚀 Smart Job Application Tracker - Setup & Run Guide

## Prerequisites
- **Node.js**: v18 or higher (You have: v20.17.0 ✅)
- **npm**: v8 or higher (You have: v10.8.2 ✅)
- **PostgreSQL**: v12 or higher (for database)
- **Git**: For version control

---

## 📦 Installation Steps

### Step 1: Clone or Navigate to Project
```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"
```

### Step 2: Install Dependencies
Both backend and frontend dependencies have already been installed. If you need to reinstall:

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 3: Setup Environment Variables

#### Backend Configuration
Edit or create `backend/.env`:
```bash
cp backend/.env.example backend/.env
```

**Update `backend/.env` with your settings:**
```env
NODE_ENV=development
PORT=5000

# Database (choose one option below)
# Option A: PostgreSQL on your machine
DB_HOST=localhost
DB_PORT=5432
DB_NAME=job_tracker_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Option B: Use Docker PostgreSQL (recommended - see Docker section)
DB_HOST=postgres
DB_PORT=5432
DB_NAME=job_tracker_db
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Secret (change this!)
JWT_SECRET=your_secure_jwt_secret_here

# Gmail OAuth (optional - for email integration)
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret

# Outlook OAuth (optional)
OUTLOOK_CLIENT_ID=your_outlook_client_id
OUTLOOK_CLIENT_SECRET=your_outlook_client_secret

# OpenAI (optional - for NLP features)
OPENAI_API_KEY=your_openai_api_key
```

#### Frontend Configuration
Edit or create `frontend/.env`:
```bash
cp frontend/.env.example frontend/.env
```

**Content should be:**
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
PUBLIC_URL=/
```

---

## 🗄️ Database Setup

### Option A: Using Docker (Recommended)

1. **Install Docker**: https://www.docker.com/products/docker-desktop

2. **Start PostgreSQL with Docker:**
```bash
docker run --name job-tracker-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=job_tracker_db \
  -p 5432:5432 \
  -d postgres:15-alpine
```

3. **Verify PostgreSQL is running:**
```bash
docker ps | grep job-tracker-db
```

### Option B: Local PostgreSQL Installation

1. **Install PostgreSQL**: https://www.postgresql.org/download/

2. **Create database:**
```bash
psql -U postgres -c "CREATE DATABASE job_tracker_db;"
```

3. **Verify:**
```bash
psql -U postgres -l
```

### Setup Database Schema

Once PostgreSQL is running, run migrations:

```bash
cd backend
npm run migrate
```

Or manually run SQL:
```bash
psql -U postgres -d job_tracker_db < migrations/001_initial_schema.sql
```

---

## 🎯 Running the Project

### Option 1: Using Docker Compose (Easiest) ✅ Recommended

```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"
docker-compose up -d
```

**This starts:**
- PostgreSQL database (localhost:5432)
- Backend API (localhost:5000)
- Frontend (localhost:3000)

**Check services:**
```bash
docker-compose ps
```

**Stop services:**
```bash
docker-compose down
```

**View logs:**
```bash
docker-compose logs -f backend    # Backend logs
docker-compose logs -f frontend   # Frontend logs
docker-compose logs -f postgres   # Database logs
```

---

### Option 2: Running Locally (Terminal by Terminal)

**Terminal 1 - Backend:**
```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"/backend
npm run dev
```

Expected output:
```
Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"/frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view job-tracker-frontend in the browser...
Local: http://localhost:3000
```

---

### Option 3: Build and Run Production Build

**Build:**
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

**Run:**
```bash
# Backend
cd backend
npm start

# Frontend (requires serving, e.g., with `serve`)
npm install -g serve
serve -s build -l 3000
```

---

## ✅ Verify Everything Works

### Check Backend Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"Server is running"}
```

### Check Frontend
Open browser: `http://localhost:3000`

You should see the Job Tracker application with:
- Navigation sidebar
- Dashboard page
- Applications, Analytics, and Settings pages

### Check Database Connection
```bash
psql -U postgres -d job_tracker_db -c "\dt"
```

You should see tables like: `users`, `applications`, `interviews`, etc.

---

## 📝 API Endpoints (Test with curl or Postman)

### Health Check
```bash
curl http://localhost:5000/health
```

### Get All Applications
```bash
curl http://localhost:5000/api/applications
```

### Create Application
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Google",
    "job_title": "Senior Engineer",
    "status": "Applied",
    "source": "LinkedIn"
  }'
```

### Get Analytics
```bash
curl http://localhost:5000/api/analytics/summary
```

---

## 🐛 Troubleshooting

### Backend won't start
**Error:** `Cannot find module 'ts-node'`
```bash
cd backend
npm install --save-dev ts-node
npm run dev
```

### Port 5000 already in use
```bash
# Kill process using port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Or change PORT in backend/.env
PORT=5001
```

### Port 3000 already in use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or set environment variable
PORT=3001 npm start
```

### PostgreSQL connection error
**Make sure:**
1. PostgreSQL is running: `psql -U postgres` (try to connect)
2. Database exists: `psql -U postgres -l`
3. Database name matches `.env`: `job_tracker_db`
4. Credentials in `.env` are correct

### Dependencies issues
```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📂 Project Structure
```
Smart Job Application Tracker/
├── backend/
│   ├── src/
│   │   ├── index.ts           # Main server file
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── models/            # Data models
│   │   ├── middleware/        # Auth & other middleware
│   │   └── config/            # Database config
│   ├── migrations/            # Database schema
│   ├── package.json
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API client
│   │   ├── App.tsx            # Main App
│   │   └── index.tsx          # Entry point
│   ├── package.json
│   └── .env                   # Environment variables
├── docker-compose.yml         # Docker configuration
└── README.md
```

---

## 🔧 Development Commands

### Backend
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Run production build
npm run migrate  # Run database migrations
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run eject    # Eject from create-react-app (irreversible!)
```

---

## 🚢 Deployment

### Deploy with Docker
```bash
# Build images
docker-compose build

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Environment Variables for Production
Update `backend/.env` and `frontend/.env` with production values:
- Change `JWT_SECRET` to a secure value
- Update database credentials
- Add production OAuth credentials
- Set `NODE_ENV=production`

---

## 📚 Next Steps

1. **Connect Email Accounts**
   - Setup Gmail OAuth 2.0
   - Setup Outlook OAuth 2.0
   - Update `.env` with credentials

2. **Test Email Parsing**
   - Set up email sync service
   - Test NLP email classification

3. **Build Kanban Board**
   - Add drag-and-drop functionality
   - Connect to backend APIs

4. **Add Authentication**
   - Implement user registration
   - Implement user login with JWT

---

## ❓ Need Help?

Check the main [README.md](../README.md) for project overview and architecture.

---

**Last Updated:** January 2, 2026
**Node Version:** v20.17.0 ✅
**npm Version:** v10.8.2 ✅
