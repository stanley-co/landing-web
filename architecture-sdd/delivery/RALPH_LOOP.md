# Ralph Loop

## Purpose

This is the single execution loop for the SDD implementation. Its task board is
[`RALPH_TASK_BOARD.md`](RALPH_TASK_BOARD.md). The architectural SDD remains the
source of truth; project-local `docs/implementation` files are execution logs.

## Iteration protocol

Each iteration processes exactly one `READY` task, or one safe independent task
when the main path is blocked.

1. Select the highest-priority `READY` task whose dependencies are `DONE`.
2. Read the referenced SDD, ADR, validation evidence, and the target repository's
   `PROGRESS.md` before changing files.
3. Record the task as `IN_PROGRESS` in the task board and target project log.
4. Implement only the stated scope. Preserve existing landing routes, public IDs,
   `/home`, and `/news/:id`.
5. Run the task quality gate. Do not weaken tests or validations to make them pass.
6. If code and SDD differ, stop that scope, add a deviation, correct the source
   SDD and working copies, then resume.
7. Update the task board with evidence, test result, commit hash, and next action.
8. Create one local Conventional Commit for the completed logical task.
9. Select the next task. Never push or alter remotes.

## Status vocabulary

| Status | Meaning |
| --- | --- |
| `DONE` | Implemented, checked, documented, and committed locally. |
| `READY` | Dependencies are complete; the task can start now. |
| `IN_PROGRESS` | Actively being implemented; only one task may use this status. |
| `BLOCKED` | Cannot proceed because of a concrete dependency or environmental limitation. |
| `NOT_STARTED` | Not currently eligible or not yet selected. |
| `DEFERRED` | Intentionally postponed by an approved MVP or compatibility decision. |

## Priority and dependency policy

Priority is determined by: preserving existing user functionality, unblocking the
most downstream work, data-loss/security risk, then implementation order.

- A dependent task cannot become `READY` until every listed dependency is `DONE`.
- `BLOCKED` must include a reproducible cause and an independent next task.
- A task with failed quality gate remains `IN_PROGRESS` until fixed, or becomes
  `BLOCKED` with the exact failed command and remediation.
- `DEFERRED` work is not silently dropped. Its reason and re-entry condition stay
  in the board.

## Mandatory quality gates

| Scope | Required checks |
| --- | --- |
| API contracts | `npm run lint`, `npm run validate`, TypeScript generation; Java generation when Java 21 is available. |
| Infrastructure | `docker compose config`, `docker compose up -d`, health checks, and service logs for initialization jobs. |
| Backend | `./mvnw test`, `./mvnw verify`; Docker Maven/Temurin 21 is permitted when host Java is absent. |
| Admin/landing frontend | project lint, typecheck, test, build, and relevant route/component/API smoke checks. |
| Migration | unit/integration tests, dry-run, repeat-run, ID preservation, report verification. |
| Cross-project work | OpenAPI contract validation plus the relevant admin-to-public E2E scenario. |

## Required task evidence

Every completed task row must point to:

- requirement/SDD and ADR evidence;
- changed project and relevant implementation files;
- verification command and result;
- local commit hash;
- compatibility impact;
- next unblocked task.

## Safety invariants

- No `git push`, remote changes, force operations, production S3 writes, or
  production migrations.
- No secrets in Git or frontend bundles.
- The gateway remains an internal backend edge layer under ADR-002.
- PostgreSQL is the structured-data source of truth; S3/MinIO is the binary-file
  source of truth.
- MVP excludes i18n, scheduled publication, a universal page builder, a real
  Telegram adapter, and Bitrix integration.

## Current loop head

`ED-002` is the active next task: add CORS allowlist, security headers and
request/upload limits to the internal edge layer in `w-backend-service`. It follows
the completed prefix-aware edge policy commit `90a1857`.
