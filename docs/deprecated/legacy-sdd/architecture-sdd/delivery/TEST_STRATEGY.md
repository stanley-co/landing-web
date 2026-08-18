# Test Strategy

Levels:

- contract tests from OpenAPI;
- backend unit/integration/security tests;
- migration dry-run/import tests;
- admin component/E2E tests;
- public frontend E2E tests;
- compose smoke;
- VPS smoke.

Critical scenarios:

- `/equipment` and product detail by existing ID;
- `/news/:id` by existing ID;
- `/home` legacy;
- lead creation and email event;
- PDF upload and preview;
- role matrix enforcement;
- idempotent migration.

