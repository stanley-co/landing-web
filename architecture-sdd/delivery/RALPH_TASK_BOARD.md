# Ralph Task Board

Last synchronized: 2026-07-18. Status and commits are local only.

## Phase 0: Workspace and source baseline

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| WS-001 | workspace | Audit paths, Git state, SDD, ADR, OpenAPI, and landing baseline | - | DONE | `IMPLEMENTATION_WORKSPACE_MAP.md`; landing branch created. |
| WS-002 | workspace | Create separate repositories and `codex/sdd-implementation` branches | WS-001 | DONE | `w-api-contracts`, `w-platform-infra`, `w-backend-service`, `w-data-migrator`, `w-admin-web`. |
| WS-003 | landing-web | Commit validated architecture package without taking unrelated files | WS-001 | DONE | `4c07d6b`; unrelated untracked files remain untouched. |
| WS-004 | all projects | Copy project SDD, relevant ADRs, and implementation logs | WS-002 | DONE | Initial `chore(repo)` commits in all new projects. |
| WS-005 | w-api-gateway | Apply ADR-002 gateway placement decision | WS-001 | DONE | Gateway SDD copied to backend; no standalone gateway repo. |
| WS-006 | workspace | Establish this Ralph loop and central task board | WS-001 | DONE | This document set; update after every logical task. |

## Phase 1: API contracts

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| CT-001 | w-api-contracts | Create contract repository, working SDD, and compatibility rules | WS-004 | DONE | `419622b`; `CONTRACT_COMPATIBILITY.md`. |
| CT-002 | w-api-contracts | Define common errors, pagination, filtering, sorting, status and role enums | CT-001 | DONE | `00c8739`; `ErrorResponse`, `PageMetadata`, approved enums. |
| CT-003 | w-api-contracts | Define public site, menu, pages, catalog, content, slides, contacts, documents, certificates, and leads API | CT-002 | DONE | `00c8739`; preserves ID-based product/content APIs and `/news/:id`. |
| CT-004 | w-api-contracts | Define auth and role-protected admin API models and operations | CT-002 | DONE | `00c8739`; roles limited to `ADMIN`, `FEATURE_OWNER`, `CONTENT_READER`. |
| CT-005 | w-api-contracts | Add OpenAPI validation, required-route lint, bundle, and TypeScript generation | CT-003, CT-004 | DONE | `00c8739`, `18a78ed`; lint/validate/generation passed. |
| CT-006 | w-api-contracts | Generate/verify Spring interfaces or models | CT-005, BE-001 | NOT_STARTED | Run with backend Java 21 Docker environment; `config/spring.json` is ready. |
| CT-007 | landing-web | Synchronize corrected executable contract with architectural SDD | CT-005 | DONE | `f645059`; added `CONTRACT_BASELINE_20260717.md`. |

## Phase 2: Local platform

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| IN-001 | w-platform-infra | Define local PostgreSQL, MinIO, Mailpit, network, and volumes | WS-004 | DONE | `e0701a1`; `compose.yaml`. |
| IN-002 | w-platform-infra | Add local-only environment templates and secret hygiene | IN-001 | DONE | `e0701a1`; `.env.example` and per-client examples. |
| IN-003 | w-platform-infra | Initialize MinIO bucket and versioning | IN-001 | DONE | `e0701a1`; `minio-init` created `stanley-media`. |
| IN-004 | w-platform-infra | Add local backup procedure | IN-001 | DONE | `e0701a1`; `scripts/backup-local.sh`. |
| IN-005 | w-platform-infra | Verify compose services and health checks | IN-002, IN-003 | DONE | PostgreSQL, MinIO, Mailpit healthy; initial Docker Hub timeout retried successfully. |
| IN-006 | w-platform-infra | Add backend container health dependency to Compose | BE-001 | NOT_STARTED | Add only after backend exposes Actuator health. |

## Phase 3: Backend foundation

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| BE-001 | w-backend-service | Initialize Maven/Spring Boot Java 21 modular-monolith foundation and wrapper | CT-005, IN-005 | DONE | `a9caea9`; Docker Maven/Temurin 21 `verify` and local JAR startup passed. |
| BE-002 | w-backend-service | Add profiles, typed configuration, PostgreSQL connection, and Flyway foundation | BE-001 | DONE | `a9caea9`; typed app config, Flyway V1, local PostgreSQL startup passed. |
| BE-003 | w-backend-service | Add standard error response, validation, and request-ID filter | BE-001, CT-002 | DONE | `a9caea9`; contract-aligned error model and 3 request-ID tests. |
| BE-004 | w-backend-service | Add structured logging, Actuator health, and baseline metrics | BE-001 | DONE | `a9caea9`; health is `200 UP`, JSON access event includes request ID. |
| BE-005 | w-backend-service | Add JUnit, Mockito, MockMvc, Testcontainers foundation | BE-001, BE-002 | DONE | `7d8303a`; reusable PostgreSQL Testcontainers, Flyway and MockMvc health tests pass. |

## Phase 4: Internal gateway / edge layer

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| ED-001 | w-backend-service | Separate public, auth, admin, and health route policies | BE-001 | DONE | `90a1857`; public 404/admin 401 are normalized with request IDs. |
| ED-002 | w-backend-service | Add CORS allowlist, security headers, request-size and upload limits | ED-001, BE-003 | DONE | `5dc4e64`; CORS allow/deny, headers, multipart 30 MB and normalized 413 verified. |
| ED-003 | w-backend-service | Add rate limits for login and lead submission | ED-001 | DONE | `84144bf`; bounded local limiter returns normalized 429 and Retry-After. |
| ED-004 | w-backend-service | Add edge-policy integration tests | ED-002, ED-003, BE-005 | DONE | `5471d46`; MockMvc covers CORS, headers, request ID, 413 and lead 429 chain. |

## Phase 5: Authentication and RBAC

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| AU-001 | w-backend-service | Add administrator, role, permission, session, and audit schema | BE-002 | DONE | `3d48268`; Flyway V2, exact role seed and clean PostgreSQL verification. |
| AU-002 | w-backend-service | Implement login, refresh, logout, current user, and local bootstrap | AU-001, CT-004, ED-001 | DONE | `d897200`; `AuthIntegrationTest` proves bootstrap login, refresh rotation, `/me`, old-token invalidation, and logout revocation. Access tokens are opaque and held in admin memory only; refresh is `HttpOnly`/`SameSite=Strict`. |
| AU-003 | w-backend-service | Implement RBAC policies and login audit/failed-attempt tracking | AU-001, AU-002 | DONE | `16bcc49`; Flyway V4 seeds module/action permissions for only the three approved roles. Lockout/audit events omit credentials and session tokens; cookie refresh/logout require SPA CSRF double submit. |
| AU-004 | w-backend-service | Add auth/RBAC integration tests | AU-002, AU-003, BE-005 | DONE | `e997b16`; targeted tests prove role authority evaluation and actual method-security `200`/normalized `403`, alongside session/revoke/lockout/audit coverage. |

## Phase 6: Storage, media, documents, certificates

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| ST-001 | w-backend-service | Implement S3/MinIO abstraction, media metadata, checksum, MIME/size validation | BE-002, ED-002, IN-003 | DONE | `d449c52`; Flyway V5, S3-compatible adapter, media metadata, SDD key conventions and MIME/size/SHA-256 policy. |
| ST-002 | w-backend-service | Add media upload, safe-delete, replacement, and usage detection API | ST-001, AU-003, CT-004 | DONE | `17455e9`; authorized multipart metadata flow, audit, MIME/size policy, safe-delete boundary, and local MinIO put/get/delete verification. |
| ST-003 | w-backend-service | Implement document and certificate metadata over PDF media | ST-001, CT-003, CT-004 | DONE | `4c48e2c`; admin/public metadata endpoints, PDF-only validation, status/order and certificate dates; binaries stay in MinIO/S3. |
| ST-004 | w-backend-service | Add MinIO integration tests | ST-002, ST-003, BE-005 | DONE | `5597df8`; local MinIO put/get/delete, MIME/size/checksum policy, and real document-referenced PDF delete denial. |

## Phase 7: Catalog

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| CA-001 | w-backend-service | Model ordered global/category tree, stable IDs, lifecycle and public/admin tree API | BE-002, AU-003, CT-003 | DONE | `1f843a4`; V7, active-only public tree, manual order, RBAC, audit, 29-test Docker Maven verify. |
| CA-002 | w-backend-service | Model products with immutable external IDs and core descriptions/status/order; add active category counts and product-reference archive guard | CA-001, ST-001 | DONE | `c588d43`; V8 active counts use PostgreSQL and archive rejects any product reference. |
| CA-003 | w-backend-service | Add ordered specs, advantages, gallery, main media, video, and related content | CA-002, ST-001 | DONE | `72feba4`; V9 atomic relation replacement/read projection, safe media usage, Rutube and duplicate-gallery validation; Docker Maven verify passed with 31 tests. |
| CA-004 | w-backend-service | Implement public catalog list/detail/search/filter/category APIs | CA-003, CT-003, ED-001 | DONE | `17e65e7`; active list/search/filter and one detail aggregate with strict query bounds; full Docker Maven verify passed 35 tests. Related summaries remain a `CO-002` enrichment. |
| CA-005 | w-backend-service | Implement admin catalog CRUD, archive, and reordering APIs | CA-003, AU-003, CT-004 | DONE | `35db438`; feature owner lifecycle API, reader read-only RBAC, immutable IDs, media/spec/advantage/video/related-content relations, archive and reorder; full Docker Maven verify passed 36 tests. |
| CA-006 | w-backend-service | Add catalog integration and contract tests | CA-004, CA-005, BE-005 | DONE | `1bf0099` verifies OpenAPI catalog routes, immutable IDs, ordered relations, lifecycle, and opaque bearer transport; `35db438` full Docker Maven verify passed 36 HTTP/integration tests. |

## Phase 8: Content, pages, carousel, contacts

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| CO-001 | w-backend-service | Model NEWS and ARTICLE with immutable external IDs and structured blocks | BE-002, ST-001, CT-003 | DONE | `985c7c1`; V10 preserves external IDs, required category string, cover/image media protection, and exactly paragraph/image/quote/link blocks; Docker Maven verify passed 38 tests. |
| CO-002 | w-backend-service | Add public content list/detail and related-content API | CO-001, ED-001 | DONE | `073808a`; active NEWS/ARTICLE filtering and ID detail preserve `/news/:id`; active type-compatible relations receive optional summaries and unresolved IDs remain intact. Full Docker Maven verify passed. |
| CO-003 | w-backend-service | Add admin content CRUD and ordered block editing API | CO-001, AU-003, CT-004 | DONE | `ee69c39`; protected list/create/read/update/archive, immutable IDs, typed `imageId` blocks, atomic ordered replacement, audit, and reader/write RBAC. Full Docker Maven verify passed. |
| PA-001 | w-backend-service | Add only SDD-approved managed pages and settings | BE-002, AU-003, CT-003 | READY | Contract must first narrow actual About/Contacts/Privacy ownership; no universal page builder. |
| PA-002 | w-backend-service | Add contacts and explicitly managed menu API | PA-001, CT-003 | NOT_STARTED | Do not migrate technical routes/config. |
| SL-001 | w-backend-service | Add carousel slide model, public API, admin CRUD/reorder | ST-001, AU-003, CT-003, CT-004 | NOT_STARTED | Supports image, mobile image, action, order, active. |
| CO-004 | w-backend-service | Add content/page/slide integration and contract tests | CO-002, CO-003, PA-002, SL-001, BE-005 | NOT_STARTED | Verify ID compatibility and ordering. |

## Phase 9: Legacy home

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| LE-001 | w-backend-service | Add minimal deprecated legacy block model and compatibility API for `/home` | BE-002, CT-003 | NOT_STARTED | Never reuse for new pages. |
| LE-002 | w-backend-service | Add admin metadata, deletion protection, and tests for legacy blocks | LE-001, AU-003, BE-005 | NOT_STARTED | Must expose deprecated warning. |

## Phase 10: Leads and notifications

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| LD-001 | w-backend-service | Model lead, consent, source/form context, product relation, and notification events | BE-002, CT-003 | NOT_STARTED | Preserve actual form fields. |
| LD-002 | w-backend-service | Implement public lead submission, validation, anti-spam, persistence, and rate limit | LD-001, ED-003 | NOT_STARTED | Phone or email plus consent. |
| NT-001 | w-backend-service | Implement SMTP/Mailpit email notification and delivery retry | LD-001, IN-005, AU-003 | NOT_STARTED | No PII in logs. |
| NT-002 | w-backend-service | Implement disabled Telegram sender adapter | LD-001 | NOT_STARTED | Returns `SKIPPED`/`DISABLED`; no HTTP/token. |
| LD-003 | w-backend-service | Add admin lead list/detail/retry API and tests | LD-002, NT-001, CT-004, BE-005 | NOT_STARTED | Bitrix stays out of MVP. |

## Phase 11: Data migration

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| MI-001 | w-data-migrator | Initialize Java command-line runner and read-only S3 configuration | BE-001, IN-005 | NOT_STARTED | ADR-006; no production writes. |
| MI-002 | w-data-migrator | Implement source scan, JSON discovery, schema validation, and dry-run report | MI-001 | NOT_STARTED | Current S3 is source; local JSON is comparison only. |
| MI-003 | w-data-migrator | Map/import categories and products with stable IDs/order/media refs | MI-002, CA-003 | NOT_STARTED | Handle `atricles` legacy typo as input only. |
| MI-004 | w-data-migrator | Map/import carousel, news, articles, pages, files, and relations | MI-002, CO-001, PA-001, SL-001, ST-003 | NOT_STARTED | Report broken refs and missing files. |
| MI-005 | w-data-migrator | Prove idempotency, repeat-run, partial failure, and verification report | MI-003, MI-004 | NOT_STARTED | Local PostgreSQL/MinIO only first. |

## Phase 12: Administration UI

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| AD-001 | w-admin-web | Initialize Vite/React/TypeScript/Ant Design foundation with generated client | CT-005, AU-002 | DONE | `64baecf`; Vite/React/Ant Design/Query/RHF/Zod foundation, contract type generation, lint/typecheck/build/Vitest pass. |
| AD-002 | w-admin-web | Implement login, auth/session state, router, shell, error boundary, permission guards | AD-001, AU-003 | DONE | `25a2e97`; opaque token in memory, refresh-cookie restoration, protected routes, shell, error boundary and permission guards; lint/typecheck/build/Vitest pass. |
| AD-003 | w-admin-web | Implement category and product editors with media, specs, advantages, gallery, video, relations, archive/reorder | AD-002, CA-005, ST-002 | DONE | `ec68b8a` lists; `35b0294` typed product fields/media; `b575cd7` content selection; `326c8f9` batch reorder; `b606a28` lifecycle-safe category edit; `22c4e36` component coverage. No raw JSON editor. |
| AD-004 | w-admin-web | Implement media, document, and certificate management | AD-002, ST-003 | PARTIAL | `ca61d26`: media list/upload/safe-delete, PDF selection and document/certificate create/list. Replace/archive needs missing contract operations. |
| AD-005 | w-admin-web | Implement content, page, contacts, menu, carousel, and legacy management | AD-002, CO-003, PA-002, SL-001, LE-002 | IN_PROGRESS | `d83b683`: NEWS/ARTICLE list, typed-block editor and archive. Other screens wait for PA-002, SL-001 and LE-002; legacy shows Deprecated badge. |
| AD-006 | w-admin-web | Implement leads, users, audit, settings, component tests, and E2E critical paths | AD-002, LD-003 | NOT_STARTED | Include notification retry. |

## Phase 13: Landing integration

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| FE-001 | landing-web | Add generated client and API configuration without changing routes/UI | CT-005, ED-002 | DONE | `a863d70`: generated public schema, `openapi-fetch` client and `VITE_PUBLIC_API_BASE_URL`; routes/UI and S3 flows unchanged. |
| FE-002 | landing-web | Move site settings, menu, carousel, categories, and catalog list to public API | FE-001, CA-004, SL-001, PA-002 | NOT_STARTED | Remove only replaced direct S3 JSON fetches. |
| FE-003 | landing-web | Move product detail/search to public API | FE-002, CA-004, CO-002 | NOT_STARTED | Preserve ID route and full detail rendering; related article cards require content summaries. |
| FE-004 | landing-web | Move news/articles list and `/news/:id` detail to public API | FE-001, CO-002 | NOT_STARTED | Do not require slug. |
| FE-005 | landing-web | Move pages, contacts, documents/certificates, and lead forms to public API | FE-001, PA-002, ST-003, LD-002 | NOT_STARTED | Remove direct Telegram/Bitrix path only here. |
| FE-006 | landing-web | Integrate legacy `/home` compatibility API and test all critical routes | FE-005, LE-001 | NOT_STARTED | Legacy blocks remain visible. |

## Phase 14: System verification and delivery

| ID | Project | Task | Dependencies | Status | Evidence / next action |
| --- | --- | --- | --- | --- | --- |
| E2E-001 | system | Catalog admin-to-public end-to-end scenario | AD-003, FE-003, CA-006 | NOT_STARTED | Product with specs/gallery/video appears on landing. |
| E2E-002 | system | Carousel admin-to-public end-to-end scenario | AD-005, FE-002, SL-001 | NOT_STARTED | Active ordered slide appears on landing. |
| E2E-003 | system | Content ID and `/news/:id` end-to-end scenario | AD-005, FE-004, CO-004 | NOT_STARTED | Existing content ID resolves. |
| E2E-004 | system | Lead, Mailpit delivery, retry, and admin visibility scenario | AD-006, FE-005, LD-003 | NOT_STARTED | Email event and retry are auditable. |
| E2E-005 | system | Legacy `/home` compatibility and deprecation scenario | AD-005, FE-006, LE-002 | NOT_STARTED | Route works and admin marks it deprecated. |
| REL-001 | system | Final operation, migration, security, and release documentation | E2E-001, E2E-002, E2E-003, E2E-004, E2E-005, MI-005 | NOT_STARTED | Includes runbook, backup/rollback, acceptance report. |

## Deferred MVP scope

| ID | Scope | Status | Re-entry condition |
| --- | --- | --- | --- |
| DF-001 | i18n | DEFERRED | Approved business requirement and translated content model. |
| DF-002 | Scheduled publication and workflow | DEFERRED | Explicit publication process requirement. |
| DF-003 | Universal page builder | DEFERRED | Evidence that stable page models cannot support a needed business case. |
| DF-004 | Real Telegram and Bitrix integrations | DEFERRED | Approved credentials, delivery policy, and dedicated acceptance criteria. |
| DF-005 | Separate Spring Cloud Gateway deployable | DEFERRED | ADR-002 extraction criteria are met. |
| DF-006 | Kubernetes | DEFERRED | Production scale/operational ADR approves it. |
