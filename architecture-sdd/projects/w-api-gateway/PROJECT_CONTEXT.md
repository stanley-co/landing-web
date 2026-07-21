# Project Context

Gateway responsibilities:

- expose stable API prefixes;
- apply CORS, request ID, rate limits, upload limits and security headers;
- route public/admin/auth/health requests to backend modules;
- normalize error responses.

MVP deployment unit: `w-backend-service`.

