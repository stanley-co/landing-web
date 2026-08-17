# Cross-Repository Change Routing

Start every request from `AGENTS.md`, then resolve repositories through [`.project/repositories.yaml`](../../.project/repositories.yaml), read each affected repository's `AGENTS.md`, and use its owner documentation before editing.

| Change | Required repositories and order | Minimum validation |
| --- | --- | --- |
| Public SEO, route, or rendering only | `landing-web` | Landing lint, typecheck, tests, build |
| Admin-only component or UX | `w-admin-web` | Admin lint, typecheck, tests, build |
| Backend-only business behavior with no exposed contract impact | `w-backend-service` | Backend verification and relevant integration tests |
| API endpoint, DTO, error, auth interface, or compatibility rule | `w-api-contracts` → `w-backend-service` → every affected frontend consumer | Contract validation, backend tests, each consumer generation and tests |
| Database schema or migration | `w-backend-service` → contract/consumers if exposed → `w-platform-infra` if runtime impact | Migration and backend integration checks; consumer impact analysis |
| Media upload, shared media format, or S3 path convention | `w-backend-service` → affected frontends → `w-platform-infra` when provisioning/routing changes | Backend storage tests, consumer tests, Compose/config review |
| Role, permission, or auth-flow change | `w-api-contracts` when API shape changes → `w-backend-service` → `w-admin-web` → `landing-web` if public behavior changes | Provider security tests and affected consumer tests |
| Runtime, nginx, CI/CD, environment, or deployment | `w-platform-infra` → affected service repositories only when their build/runtime contract changes | Compose config, operational checks, affected service checks |
| Historical data migration | `w-data-migrator` plus backend and infra owners | Explicit approval, dry run, validation, idempotency evidence; never production by default |

For a cross-service task, make changes in the owner repositories, update owner documentation there, validate each repository separately, and create one commit per repository. A product field visible in admin and landing normally touches contracts, backend, admin, and landing in that order.
