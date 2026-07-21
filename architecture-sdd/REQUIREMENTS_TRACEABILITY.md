# Requirements Traceability

| Requirement ID | Требование | Источник | Проект | Модуль | SDD-файл | API | Тест |
| --- | --- | --- | --- | --- | --- | --- | --- |
| REQ-SYS-001 | Modular monolith, no microservices in MVP | user | w-backend-service | common | ADR-001 | n/a | architecture review |
| REQ-SYS-002 | Remove unused `/home` and legacy blocks from MVP after dependency check | approved scope | landing-web | removed scope | ADR-016 | n/a | route/reference scan + build |
| REQ-SYS-003 | Preserve `/news/:id` and existing IDs | user/code | contracts/backend/frontend | content | DTO_CONTENT | `/public/news/{id}` | contract + E2E |
| REQ-SYS-004 | No i18n in MVP | user | all | all | BUSINESS_RULES | n/a | review |
| REQ-SYS-005 | Status model DRAFT/ACTIVE/ARCHIVED | user | backend/admin | content/catalog | STATUS_MODEL | admin CRUD | API tests |
| REQ-FRONT-001 | Replace S3 JSON reads with public API | audit | landing-web | api client | projects/landing-web/MIGRATION_PLAN | public API | public E2E |
| REQ-FRONT-002 | Remove direct Telegram/Bitrix calls | audit/user | landing-web/backend | lead | API_INTEGRATION_MAP | POST leads | lead E2E |
| REQ-GATEWAY-001 | Implement CORS/rate/request ID/security headers | user | w-backend-service | edge | projects/w-api-gateway | all API | gateway tests |
| REQ-BACKEND-001 | Java 21 Spring Boot 3.x PostgreSQL Flyway | user | w-backend-service | all | ARCHITECTURE | all API | build/tests |
| REQ-BACKEND-002 | Email-only lead notifications with persisted delivery result | approved scope | backend | lead/notification | NOTIFICATIONS | POST `/public/leads` | integration test |
| REQ-BACKEND-003 | No Telegram or Bitrix adapter/browser integration in MVP | approved scope | landing-web/backend | lead | ADR-016 | n/a | source scan + build |
| REQ-ADMIN-001 | Three roles matrix | user | admin/backend | rbac | SYSTEM_ROLES/RBAC | auth/admin | RBAC tests |
| REQ-ADMIN-002 | PDF documents and replaceable image/PDF media management | approved scope | admin/backend | document/media | FILE_UPLOAD/PDF | media/document APIs | upload tests |
| REQ-LEGAL-001 | Fixed managed Markdown privacy policy with one ACTIVE version | approved scope | admin/backend/landing | legal | ADR-016 | public/admin legal APIs | API + UI tests |
| REQ-MIGRATION-001 | S3 migration skeleton retained but implementation deferred | approved scope | w-data-migrator | migration | IMPLEMENTATION_PLAN | n/a | documentation review |
| REQ-MIGRATION-002 | Preserve IDs and order | user | migrator/backend | all imported | ID_STRATEGY | n/a | migration verification |
| REQ-INFRA-001 | Docker Compose local stack | user | w-platform-infra | compose | DOCKER_COMPOSE | n/a | compose smoke |
| REQ-CONTRACT-001 | OpenAPI contracts source | user | w-api-contracts | openapi | openapi/openapi.yaml | all API | contract tests |
| REQ-ID-001 | UUID primary keys are backend generated; externalId is nullable import-only and code is generated | approved UUID scope | backend/contracts/admin | all aggregates | ADR-017 | create/read DTOs | migration + API tests |
| REQ-MEDIA-001 | Common picker supports library selection and inline upload without leaving an editor | approved media scope | backend/admin | media | ADR-018 | media/upload-sessions | UI + API tests |
| REQ-MEDIA-002 | Temporary uploads expire after 24h; actual typed FK relations define usages | approved media scope | backend | media/catalog/content/slide/document | ADR-018 | media usages | cleanup + usage tests |
