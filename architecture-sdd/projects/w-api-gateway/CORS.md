# CORS

Use allowlist:

- public frontend domain;
- admin frontend domain;
- local dev origins.

No wildcard with credentials. Allowed methods: GET, POST, PUT, PATCH, DELETE, OPTIONS. Allowed headers include `Content-Type`, `Authorization`, `X-Request-ID`, CSRF header if cookie auth is used.

