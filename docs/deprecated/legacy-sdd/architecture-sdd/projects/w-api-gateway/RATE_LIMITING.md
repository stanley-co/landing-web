# Rate Limiting

Baseline:

- public GET: moderate default;
- lead POST: strict per IP/user-agent;
- login/refresh: strict per IP/email;
- admin writes: protected by auth; still guard abusive patterns.

Return `429` with standard error model.

