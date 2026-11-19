# Deployment guide

See the README for the Vercel + Render + Neon deployment sequence.

Render backend root: `backend`
Build: `pip install -r requirements.txt`
Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

Vercel frontend root: `frontend`
Build: `npm run build`
Output: `dist`
Environment: `VITE_API_BASE_URL=https://YOUR-RENDER-SERVICE`

Neon: set the SQLAlchemy psycopg connection string as `DATABASE_URL` on Render. Run Alembic migrations before serving production traffic.
