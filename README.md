# SCHEMETA

A modular full-stack platform starter for helping entrepreneurs discover government schemes and build digital business skills.

## Stack
- Frontend: React, TypeScript, Vite, React Router, Axios, Lucide React
- Backend: FastAPI, SQLAlchemy 2, Pydantic Settings, JWT, passlib/bcrypt
- Database: PostgreSQL (local or Neon)
- Migrations: Alembic
- Hosting target: Vercel (frontend), Render (backend), Neon (PostgreSQL)

> Scheme content included in the seed file is demonstration content. Verify every scheme against its official government source before presenting it as current or authoritative.

## Requirements
- Node.js LTS (18+ recommended)
- Python 3.11+
- PostgreSQL 14+ OR a Neon PostgreSQL database
- Git (optional)

## 1. Configure the backend
```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
# If PowerShell blocks activation, run:
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```
Edit `backend/.env` and set `DATABASE_URL` and a long random `JWT_SECRET_KEY`.

For local PostgreSQL, create a database named `schemeta`. Example URL:
`postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/schemeta`

For Neon, copy the connection string from the Neon dashboard and use the SQLAlchemy driver format:
`postgresql+psycopg://USER:PASSWORD@HOST/DBNAME?sslmode=require`

Then:
```powershell
alembic upgrade head
python -m app.seed
uvicorn app.main:app --reload
```
API: http://localhost:8000
Swagger docs: http://localhost:8000/docs

## 2. Configure the frontend
Open a second PowerShell terminal:
```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```
Open http://localhost:5173

## Demo login
Register a user through the UI. No default administrator password is shipped. To create an admin, register a user and update that user's `role` to `admin` directly in your trusted database environment. Never expose admin credentials in source control.

## Tests and checks
Backend:
```powershell
cd backend
.\.venv\Scripts\Activate.ps1
pytest
```
Frontend:
```powershell
cd frontend
npm run typecheck
npm run build
```

## Deployment
### Neon
1. Create a Neon project and database.
2. Copy the connection string.
3. Set it as `DATABASE_URL` in Render.
4. Run `alembic upgrade head` from the backend deployment environment before serving traffic.

### Render (backend)
1. Create a new Web Service connected to this GitHub repository.
2. Set Root Directory to `backend`.
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables: `DATABASE_URL`, `JWT_SECRET_KEY`, `CORS_ORIGINS`, `ACCESS_TOKEN_EXPIRE_MINUTES`.
6. Set `CORS_ORIGINS` to your exact Vercel production origin.

### Vercel (frontend)
1. Import the repository into Vercel.
2. Set Root Directory to `frontend`.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Set `VITE_API_BASE_URL` to the deployed Render URL, for example `https://your-service.onrender.com`.

`frontend/vercel.json` includes SPA fallback routing. The frontend only receives public configuration; never place database passwords, JWT secrets, or LLM keys in Vite variables.

## Optional Docker
Docker is not required. The repository is designed to run with native Windows tools. You can add a Docker workflow later without changing the application architecture.

## Current implementation scope
This ZIP provides a working foundation: authentication, profile, scheme listing/detail/bookmarking, basic rule-based eligibility, learning lessons/progress, community posts/comments, assistant fallback, admin scheme creation, database migrations, and a modular UI. It is a starter implementation, not a certification of production security or a substitute for verifying official scheme data. Configure HTTPS, backups, monitoring, rate limiting, email verification, and production secret management before public launch.
