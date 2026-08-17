# Dependency Map

| Consumer | Provider | Direction / contract | Owner |
| --- | --- | --- | --- |
| `landing-web` | `w-backend-service` | Public HTTP API under `/api/v1/public` | Backend implements; contract repository specifies |
| `w-admin-web` | `w-backend-service` | Auth and admin HTTP API under `/api/v1/auth` and `/api/v1/admin` | Backend implements; contract repository specifies |
| `landing-web`, `w-admin-web`, `w-backend-service` | `w-api-contracts` | `openapi/openapi.yaml`, generated TypeScript schemas, compatibility checks | `w-api-contracts` |
| `w-backend-service` | PostgreSQL | JPA/Flyway persistence | `w-backend-service` |
| `w-backend-service` | S3-compatible object storage | Media object storage and metadata integration | Backend integration; runtime provisioned by infra |
| All runtime applications | `w-platform-infra` | Compose services, nginx routing, CI/CD, environment and operational conventions | `w-platform-infra` |
| `w-data-migrator` | Backend model and object storage | Deferred, explicit migration workflow only | Migrator owns process; providers retain their contracts |

There is no runtime consumer/provider edge for a separate `w-api-gateway`. Treat it as a backend-internal concern until a documented extraction decision changes the registry.
