# Security checklist before public launch

- Generate a unique, high-entropy JWT secret.
- Use HTTPS everywhere.
- Restrict CORS to exact trusted origins.
- Use managed database credentials and rotate them if exposed.
- Add rate limiting to authentication and assistant endpoints.
- Add email verification and password reset.
- Consider HttpOnly Secure SameSite cookies plus CSRF protection.
- Add moderation workflows and abuse reporting.
- Configure database backups and monitoring.
- Review dependencies and run security scans.
- Do not publish scheme records until official source links and dates have been verified.
