# Agent Instructions

You are implementing changes in existing `landing-web`.

Rules:

- Do not rewrite UI from scratch.
- Preserve visual style and Ionic components.
- `/home` is removed from MVP after a dependency scan; do not add it back.
- Preserve `/news/:id`.
- Use OpenAPI generated client.
- Do not call S3 JSON directly after migrated endpoint exists.
- Do not put secrets in frontend.
- Implement loading, error and empty states.
- Add tests for changed behavior.
- Work in small increments matching `IMPLEMENTATION_PLAN.md`.
- Remove unused legacy components only in the dedicated `refactor(frontend): remove unused legacy home route` change.

Result format:

- changed files;
- implemented requirement IDs;
- tests run;
- API changes consumed;
- known limitations;
- unresolved issues;
- next recommended task.
