# Smart Job Application Tracker

A full-stack web application that automatically tracks job applications by reading your email and organizing them in one place.

## 🎯 Features

- **Email Integration**: Connect Gmail or Outlook to auto-detect job application emails
- **Smart Email Parsing**: NLP-powered classification of application status updates
- **Application Tracking**: Kanban-style board to track applications through their lifecycle
- **Interview Management**: Schedule and track interviews with notes
- **Analytics Dashboard**: Visualize application metrics and response rates
- **Resume Mapping**: Track which resume versions perform best
- **Automated Notifications**: Get reminders for follow-ups and interview invitations

## 🛠️ Tech Stack

### Frontend
- React 18
- Material-UI
- React Router
- Recharts (for analytics)

### Backend
- Node.js / Express
- PostgreSQL
- JWT Authentication
- Nodemailer
- Natural (NLP processing)

### DevOps
- Docker & Docker Compose
- PostgreSQL 15

## 📦 Project Structure

```
Smart Job Application Tracker/
├── frontend/
│   ├── src/
## Smart Job Application Tracker

Full-stack job application tracker with automated email sync, NLP parsing, and analytics. Built with React, Node.js/Express, TypeScript, PostgreSQL, and Docker.

### Features
- Gmail OAuth2 integration to sync job-related emails
- NLP parsing to extract company, role, status, dates, and links
- Application CRUD with full email message viewer
- Dashboard metrics: totals, applied, interviews, offers, success rate
- Analytics: response rate, interview-to-offer ratio, funnel visualization
- Modern UI with gradient branding and responsive layouts
- Docker Compose for one-command startup

### Tech Stack
- Frontend: React 18, TypeScript, Material-UI (MUI)
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL 15
- DevOps: Docker, Docker Compose
- OAuth: Google/Gmail API

### Project Structure
- `/frontend` – React application (pages, components, services)
- `/backend` – Express API (routes, controllers, services, models)
- `/backend/migrations` – SQL migrations
- `/docker-compose.yml` – Local orchestration

### Getting Started
#### Prerequisites
- Node.js 18+
- Docker & Docker Compose (recommended)
- Google Cloud OAuth credentials for Gmail API

#### Environment Variables
Create `.env` files from the provided examples:
- `backend/.env` (see `backend/.env.example`)
- `frontend/.env` (see `frontend/.env.example`)

Key backend vars:
```
PORT=5000
DATABASE_URL=postgres://user:pass@localhost:5432/job_tracker
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=http://localhost:5000/api/email/gmail/callback
```

#### Run with Docker (recommended)
```
docker-compose up -d
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Postgres: localhost:5432

#### Run locally (without Docker)
```
# backend
cd backend
npm install
npm run migrate
npm run dev

# frontend (new terminal)
cd frontend
npm install
npm start
```

### Core Workflows
- Authorize Gmail: open `http://localhost:5000/api/email/gmail` to grant access; tokens are stored in DB.
- Sync Emails: click "Sync Emails" in the app; parsed applications are created/updated.
- View Messages: click a company name in Applications to open the full email body dialog.
- Manage Applications: add/edit via the dialog in the Applications page.

### Scripts
Backend:
- `npm run dev` – start API in watch mode
- `npm run migrate` – run SQL migrations

Frontend:
- `npm start` – start React dev server

### Notes
- Primary gradient: `#667eea` → `#764ba2`
- API base: `http://localhost:5000/api`
- Default ports: frontend 3000, backend 5000, Postgres 5432

### Future Enhancements
- Outlook integration
- Resume tracking and analysis
- Interview prep tools and reminders
- Advanced analytics and exports

### License
MIT
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   ├── config/
│   │   ├── middleware/
│   │   └── index.ts
│   ├── migrations/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. Clone the repository
```bash
cd /Users/poornachandrad/Documents/"Smart Job Application Tracker"
```

2. Create environment files
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Update `.env` files with your credentials:
   - Database credentials
   - OAuth tokens for Gmail/Outlook
   - OpenAI API key
   - Email service credentials

### Running with Docker Compose

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on `localhost:5432`
- Backend API on `localhost:5000`
- Frontend on `localhost:3000`

### Running Locally

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Database Setup
```bash
cd backend
npm run migrate
```

## 📝 API Endpoints

### Authentication
- `GET /api/auth/gmail` - Initiate Gmail OAuth
- `GET /api/auth/outlook` - Initiate Outlook OAuth
- `POST /api/auth/logout` - Logout

### Applications
- `GET /api/applications` - List all applications
- `GET /api/applications/:id` - Get application details
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Email
- `GET /api/email` - Get user emails
- `POST /api/email/parse` - Parse emails for job applications
- `POST /api/email/sync` - Sync emails

### Analytics
- `GET /api/analytics/summary` - Get analytics summary
- `GET /api/analytics/applications-per-week` - Get weekly data

## 🔐 Security

- Read-only email access via OAuth 2.0
- JWT-based authentication
- Password hashing with bcrypt
- Environment variables for sensitive data
- CORS protection

## 📊 Database Schema

### Key Tables
- **users**: User accounts and authentication
- **applications**: Job applications tracking
- **interviews**: Interview scheduling and notes
- **email_accounts**: Connected email accounts
- **resumes**: Resume versions and uploads
- **notifications**: User notifications

## 🤖 Future Enhancements

- [ ] LinkedIn job auto-sync
- [ ] Chrome extension for quick apply
- [ ] Mobile app (React Native)
- [ ] AI-powered resume improvements
- [ ] Team collaboration features
- [ ] Advanced interview preparation tools
- [ ] Salary negotiation insights

## 📄 License

MIT

## 👤 Author

Poorna Chandra Dinesh

---

**Happy job hunting! 🚀**
