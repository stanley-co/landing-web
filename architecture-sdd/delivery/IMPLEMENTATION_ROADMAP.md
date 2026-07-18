# Implementation Roadmap

Execution is managed by [RALPH_LOOP.md](RALPH_LOOP.md) and the current
[RALPH_TASK_BOARD.md](RALPH_TASK_BOARD.md). The task board is the live status
ledger; this roadmap remains the higher-level phase description.

## Approved reprioritization — 2026-07-18

1. Contract and SDD synchronization.
2. Media metadata and same-ID file replacement; PDF documents.
3. Equipment carousel, catalog and content.
4. Fixed privacy policy, public lead ingestion and email delivery.
5. Matching admin screens, then public frontend integration.

`w-data-migrator`, full public acceptance and production deployment are deferred. Legacy `/home`, certificates, contacts/menu management, a page builder, Telegram/Bitrix and lead retry are removed from MVP.

Task format:

```text
Task ID
Project
Module
Title
Goal
Requirements
Dependencies
Input documents
Files to create/change
API impact
Database impact
Security impact
Tests
Acceptance criteria
Risks
Result
```

## Phase 0 Documentation

- `DOC-SDD-001`: create ADR, SDD, OpenAPI draft, ERD, boundaries.

## Phase 1 Contracts

- `CONTRACT-PUBLIC-001`: public API OpenAPI.
- `CONTRACT-ADMIN-001`: admin API OpenAPI.
- `CONTRACT-AUTH-001`: auth/error/pagination schemas.

## Phase 2 Local Infrastructure

- `INFRA-LOCAL-001`: PostgreSQL, MinIO, Mailpit, Compose.

## Phase 3 Backend Foundation

- `BACKEND-FOUNDATION-001`: Spring Boot, Flyway, errors, logs, request ID, health.

## Phase 4 Auth/RBAC

- `BACKEND-AUTH-001`: login/refresh/logout/me.
- `BACKEND-RBAC-001`: roles/permissions/users.

## Phase 5 Storage

- `BACKEND-STORAGE-001`: S3/MinIO, media metadata.

## Phase 6 Catalog

- `BACKEND-CATALOG-001`: categories/products/specs/images/videos/relations.

## Phase 7 Content And Pages

- `BACKEND-CONTENT-001`: news/articles `/news/{id}`.
- `BACKEND-PAGE-001`: pages, `/home`, legacy, slides, contacts.

## Phase 8 Leads

- `BACKEND-LEAD-001`: lead storage, validation, email, retry, Telegram stub.

## Phase 9 Migrator

- `MIGRATION-S3-001`: scan/dry-run/import/verify.

## Phase 10 Admin Frontend

- `ADMIN-FOUNDATION-001`, `ADMIN-CATALOG-001`, `ADMIN-CONTENT-001`, `ADMIN-MEDIA-001`, `ADMIN-LEADS-001`.

## Phase 11 Public Frontend

- `FRONT-CLIENT-001`, `FRONT-CATALOG-001`, `FRONT-CONTENT-001`, `FRONT-PAGES-001`, `FRONT-LEADS-001`, `FRONT-LEGACY-001`.

## Phase 12 Testing

- `TEST-CONTRACT-001`, `TEST-BACKEND-001`, `TEST-MIGRATION-001`, `TEST-E2E-001`.

## Phase 13 VPS Baseline

- `INFRA-VPS-001`, `INFRA-BACKUP-001`.
