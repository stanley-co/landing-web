<!-- bmad:context -->
<!-- Verified 2026-08-17 against 1f31287609910df28553ee75482a25c20ce54a0c. Managed by bmad-project-context. -->

## landing-web

Public FKIT frontend and the primary system control point. Landing-specific code and docs live here; system routing lives in `docs/system/`. For work beyond the public frontend, resolve owners from `.project/repositories.yaml` before editing.

## Policy

- Keep implementation in its owner repository; never copy backend, admin, contract, or infrastructure code here.
- Before changing an API, DTO, media format, S3 convention, auth, role, or database interface, identify the provider and all consumers in `docs/system/change-routing.md`.
- Commit each repository separately; do not push, rewrite history, or add credentials.

## Where things are

- System registry and cross-repository protocol: `.project/repositories.yaml`, `docs/system/`.
- Public API integration: `src/api/`; generated schema: `src/api/generated/schema.d.ts`.
- Legacy architecture material: `docs/deprecated/`; it is not a source of truth.

<!-- /bmad:context -->
