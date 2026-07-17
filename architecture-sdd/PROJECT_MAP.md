# Project Map

| Project | Responsibility | Incoming deps | Outgoing deps | Deployment unit | SDD folder | Order |
| --- | --- | --- | --- | --- | --- | --- |
| `w-api-contracts` | OpenAPI, DTO, error/pagination conventions | requirements, ADR | backend, frontend, admin tests | package/repo | `projects/w-api-contracts` | 1 |
| `w-platform-infra` | local compose and VPS baseline | env decisions | all runtime projects | infra repo | `projects/w-platform-infra` | 2 |
| `w-backend-service` | Spring Boot modular monolith | contracts, infra | PostgreSQL, S3, SMTP | Docker app | `projects/w-backend-service` | 3 |
| `w-data-migrator` | S3 migration | backend model, infra | S3, PostgreSQL | command/app/module | `projects/w-data-migrator` | 4 |
| `w-admin-web` | admin UI | contracts, backend | admin API | static frontend | `projects/w-admin-web` | 5 |
| `landing-web` | public UI | contracts, backend | public API | existing static frontend | `projects/landing-web` | 6 |
| `w-api-gateway` | edge rules; MVP inside backend | backend | clients | no separate MVP deploy | `projects/w-api-gateway` | optional/future |

Owners are future implementation agents. Each owner must keep project docs aligned with ADR.

