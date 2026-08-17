# Security Baseline

- Secrets never go into frontend bundles.
- Admin API requires authentication and RBAC.
- Passwords use BCrypt or Argon2id.
- Prefer httpOnly Secure SameSite cookies for admin session/refresh.
- CSRF required for cookie-auth writes.
- CORS allowlist only.
- Public lead endpoint rate-limited and anti-spam checked.
- Rich text/block content sanitized.
- File upload validates MIME by content and extension.
- SVG either sanitized or disallowed for upload.
- Logs mask PII and secrets.
- All admin writes produce audit logs.
- HTTPS required in production.

