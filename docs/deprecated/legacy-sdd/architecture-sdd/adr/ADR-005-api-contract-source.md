# ADR-005 API Contract Source

Status: Accepted.

Decision: use contract-first OpenAPI in `w-api-contracts` as the API source of truth.

Consequences:

- generated TypeScript clients for `landing-web` and `w-admin-web`;
- backend DTO/interfaces must stay compatible with OpenAPI;
- breaking changes require versioning or explicit compatibility review;
- contract tests are required for public and admin API.

