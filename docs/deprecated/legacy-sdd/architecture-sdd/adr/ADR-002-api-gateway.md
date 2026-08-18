# ADR-002 API Gateway

Status: Accepted.

Decision: MVP does not create a separate deployable Spring Cloud Gateway. Gateway functions are implemented as an internal edge layer inside `w-backend-service`.

Required edge functions:

- URL prefixes `/api/v1/public/**`, `/api/v1/admin/**`, `/api/v1/auth/**`;
- CORS allowlist;
- request ID;
- rate limiting;
- upload limits;
- security headers;
- centralized error format;
- access logs;
- auth filter for admin/auth routes;
- health endpoints.

Future extraction criteria:

- multiple backend services;
- independent release cycles;
- API aggregation;
- separate OAuth/security policy;
- dedicated platform team;
- independent scaling or routing needs.

