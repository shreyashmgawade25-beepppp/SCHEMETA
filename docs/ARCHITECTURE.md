# Architecture

The browser-based React application calls the FastAPI REST API. FastAPI uses SQLAlchemy to access PostgreSQL. Production topology: Vercel -> Render -> Neon.

Authentication currently uses bearer JWTs stored in browser localStorage. This is convenient for this starter but increases exposure to XSS; before a public launch, consider an HttpOnly Secure SameSite cookie design and a CSRF strategy.

The eligibility endpoint is deliberately indicative and simple. It does not make official eligibility decisions.
