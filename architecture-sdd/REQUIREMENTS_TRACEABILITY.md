# Requirements Traceability

| Requirement ID | Требование | Источник | Проект | Модуль | SDD-файл | API | Тест |
| --- | --- | --- | --- | --- | --- | --- | --- |
| REQ-SYS-001 | Modular monolith, no microservices in MVP | user | w-backend-service | common | ADR-001 | n/a | architecture review |
| REQ-SYS-002 | Preserve `/home` and legacy blocks | user/code | landing-web/backend/admin | legacy | projects/*legacy* | `/public/pages/home` | E2E `/home` |
| REQ-SYS-003 | Preserve `/news/:id` and existing IDs | user/code | contracts/backend/frontend | content | DTO_CONTENT | `/public/news/{id}` | contract + E2E |
| REQ-SYS-004 | No i18n in MVP | user | all | all | BUSINESS_RULES | n/a | review |
| REQ-SYS-005 | Status model DRAFT/ACTIVE/ARCHIVED | user | backend/admin | content/catalog | STATUS_MODEL | admin CRUD | API tests |
| REQ-FRONT-001 | Replace S3 JSON reads with public API | audit | landing-web | api client | projects/landing-web/MIGRATION_PLAN | public API | public E2E |
| REQ-FRONT-002 | Remove direct Telegram/Bitrix calls | audit/user | landing-web/backend | lead | API_INTEGRATION_MAP | POST leads | lead E2E |
| REQ-GATEWAY-001 | Implement CORS/rate/request ID/security headers | user | w-backend-service | edge | projects/w-api-gateway | all API | gateway tests |
| REQ-BACKEND-001 | Java 21 Spring Boot 3.x PostgreSQL Flyway | user | w-backend-service | all | ARCHITECTURE | all API | build/tests |
| REQ-BACKEND-002 | Email notifications MVP | user | backend | notification | NOTIFICATIONS | admin retry | integration test |
| REQ-BACKEND-003 | Telegram stub disabled | user | backend | notification | modules/notification | n/a | unit test |
| REQ-ADMIN-001 | Three roles matrix | user | admin/backend | rbac | SYSTEM_ROLES/RBAC | auth/admin | RBAC tests |
| REQ-ADMIN-002 | PDF documents/certificates management | user | admin/backend | document/certificate/media | FILE_UPLOAD/PDF | admin docs API | upload tests |
| REQ-MIGRATION-001 | Current S3 is migration source | user | w-data-migrator | migration | SOURCE_DATA | n/a | dry-run |
| REQ-MIGRATION-002 | Preserve IDs and order | user | migrator/backend | all imported | ID_STRATEGY | n/a | migration verification |
| REQ-INFRA-001 | Docker Compose local stack | user | w-platform-infra | compose | DOCKER_COMPOSE | n/a | compose smoke |
| REQ-CONTRACT-001 | OpenAPI contracts source | user | w-api-contracts | openapi | openapi/openapi.yaml | all API | contract tests |

