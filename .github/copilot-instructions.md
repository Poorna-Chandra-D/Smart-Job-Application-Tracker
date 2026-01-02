# Smart Job Application Tracker - Copilot Instructions

## Project Overview
Full-stack job application tracking system with email integration, NLP-powered parsing, and analytics.

## Tech Stack
- **Frontend**: React 18 + Material-UI + React Router
- **Backend**: Node.js + Express + TypeScript + PostgreSQL
- **DevOps**: Docker + Docker Compose

## Project Structure
- `/frontend` - React application
- `/backend` - Express API server
- `/docker-compose.yml` - Container orchestration
- Database migrations in `/backend/migrations`

## Development Workflow

### Starting Development
```bash
# With Docker
docker-compose up -d

# Or locally
cd backend && npm run dev
cd frontend && npm start
```

### Database
- PostgreSQL on port 5432
- Migrations in `backend/migrations/`
- Run migrations: `npm run migrate`

### API
- Backend runs on port 5000
- Frontend runs on port 3000
- API base: `http://localhost:5000/api`

## Key Components to Develop

### Priority 1 - Core Features
1. Email OAuth integration (Gmail + Outlook)
2. Email parsing with NLP classification
3. Application CRUD operations
4. Database models and migrations

### Priority 2 - UI & UX
1. Kanban board for application status
2. Dashboard with key metrics
3. Interview tracker
4. Analytics visualizations

### Priority 3 - Advanced Features
1. Resume tracking and analysis
2. Interview preparation tools
3. Automated follow-up suggestions
4. Advanced analytics

## Important Notes
- Use TypeScript for type safety
- Follow REST API conventions
- Implement proper error handling
- Add authentication middleware
- Use environment variables for configuration

## Common Tasks

### Add New Route
1. Create controller in `backend/src/controllers/`
2. Create route in `backend/src/routes/`
3. Register in `backend/src/index.ts`

### Add Database Table
1. Create migration in `backend/migrations/`
2. Run migration: `npm run migrate`
3. Create model interface in `backend/src/models/`

### Add UI Component
1. Create component in `frontend/src/components/`
2. Add styles using Material-UI
3. Import and use in pages

## Environment Setup
- Copy `.env.example` to `.env` in both frontend and backend
- Update credentials for OAuth and database
- Restart services after env changes

## Testing
- Backend: Run with `npm run dev` and test via API
- Frontend: Run with `npm start` and test in browser
- Database: Verify migrations with `SELECT * FROM table_name;`

## Debugging
- Check Docker logs: `docker-compose logs -f service_name`
- Frontend console: Browser DevTools
- Backend logs: Terminal output
- Database: Use `psql` or PgAdmin

