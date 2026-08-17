# System Architecture Overview

```text
Public user → landing-web → /api/v1/public → w-backend-service → PostgreSQL
                                                        └──────→ S3-compatible storage
Administrator → w-admin-web → /api/v1/auth,/api/v1/admin → w-backend-service

w-api-contracts ──OpenAPI generation/validation──> landing-web, w-admin-web, w-backend-service
w-platform-infra ──runtime topology──> landing-web, w-admin-web, w-backend-service, PostgreSQL, MinIO, Mailpit, nginx
w-data-migrator ──deferred dry-run/import tooling──> S3 and backend-owned data model
```

The backend is a Java modular monolith. It contains the MVP technical edge layer (CORS, security headers, request handling, and API routing); there is no standalone API Gateway. PostgreSQL schema and Flyway migrations are owned by the backend. Runtime configuration, Compose, nginx, deployment, and operations are owned by infrastructure. This document intentionally does not duplicate module internals.
