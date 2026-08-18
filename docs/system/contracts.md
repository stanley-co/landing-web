# Cross-Repository Contract Rules

`w-api-contracts/openapi/openapi.yaml` is the single source of truth for HTTP API shape, DTOs, errors, authentication interface, and compatibility rules. `w-backend-service` owns its implementation. `landing-web` and `w-admin-web` own only their integration notes and generated client usage.

For a change to an endpoint, DTO, error, media format, auth model, role model, or database-facing interface:

1. Identify the provider and every consumer in [dependencies.md](dependencies.md).
2. Update the owner contract or owner interface first; do not create a parallel consumer specification.
3. Regenerate and validate consumer clients where the generated schema changes.
4. Run provider and consumer checks independently, then record separate commits.

S3 object naming and bucket runtime configuration are not an API-contract repository concern: backend owns the application integration, while infrastructure owns provisioning and runtime topology. Database schema is backend-owned; consumers must never maintain schema copies.
