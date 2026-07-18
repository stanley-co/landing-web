# Decisions Index

| ADR-016 | Approved fixed MVP scope: privacy, carousel, media and email leads; legacy/certificates/contacts-menu deferred or removed |

| ADR | Decision |
| --- | --- |
| ADR-001 | Backend is Spring Boot modular monolith |
| ADR-002 | MVP gateway is internal edge layer in backend |
| ADR-003 | PostgreSQL for structured data, S3 for binaries |
| ADR-004 | Three roles and Spring Security auth/RBAC |
| ADR-005 | OpenAPI/contract-first API ownership |
| ADR-006 | Data migrator reads current S3, preserves IDs, dry-run/idempotent |
| ADR-007 | Admin frontend stack uses React/Vite and Ant Design |

## ADR-016: Approved MVP scope resolution (2026-07-18)

**Status:** Accepted. The fixed-scope decisions in [MVP_SCOPE_DECISIONS_2026-07-18.md](MVP_SCOPE_DECISIONS_2026-07-18.md) are binding. Use fixed models and DTOs for privacy policy, slides, leads, notifications, media and documents. `/about` and `/contacts` stay static. Do not implement page builder, legacy `/home`, certificates, contact/menu CRUD, lead retry, Telegram/Bitrix integrations or production migration in MVP.
