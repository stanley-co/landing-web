# Repository Registry

The machine-readable registry is [`.project/repositories.yaml`](../../.project/repositories.yaml). Repository remotes are canonical identifiers; `local_hint` values are optional relative workspace hints, not required paths.

| Repository | Responsibility and source of truth | Main technology | Providers / consumers | Typical change scope |
| --- | --- | --- | --- | --- |
| `landing-web` | Public routes, rendering, SEO, public API consumption, and system routing | React, TypeScript, Vite | Consumes `w-api-contracts` through `w-backend-service`; runtime from infra | Public pages, SEO, landing integration |
| `w-admin-web` | Administration UX, forms, and consumer integration | React, TypeScript, Vite, Ant Design | Consumes contracts and backend admin/auth APIs | Admin-only UI, permissions display, editor flows |
| `w-api-contracts` | Full OpenAPI document and compatibility rules | OpenAPI, Node validation | Provider for backend implementation and both frontend generators | DTO, endpoint, error, auth contract |
| `w-backend-service` | Business behavior, API implementation, database, migrations, S3 integration, security | Java 21, Spring Boot, PostgreSQL, Flyway | Implements contracts; serves both frontends; uses infra runtime | Domain behavior, persistence, API implementation |
| `w-data-migrator` | Migration discovery, validation, mapping, and reporting | Deferred migration project | Depends on backend model and S3 conventions | Explicitly approved migration work only |
| `w-platform-infra` | Compose, nginx, CI/CD, environments, operations, backups | Docker Compose, nginx, GitHub Actions | Runs frontend, backend, PostgreSQL, MinIO, Mailpit | Deployment, runtime topology, operations |

`w-api-gateway` is not a repository or deployable in the current MVP. Its edge responsibilities are implemented by `w-backend-service`; do not create or route work to a gateway repository unless an ADR changes that decision.
