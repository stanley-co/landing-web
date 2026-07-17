## Current phase

Phase 0 baseline recorded. Public frontend integration is intentionally deferred until public API contracts and backend endpoints exist.

## Completed tasks

| Task ID | Requirement | Commit | Tests | Status |
|---|---|---|---|---|
| PH0-LANDING-001 | Preserve baseline, routes, identifiers, and validated SDD package | Pending documentation commit | Existing build result is documented in `architecture-sdd/validation/LANDING_CODE_AUDIT.md` | COMPLETE |
| PH1-CONTRACTS-001 | Synchronize landing-facing API contract baseline | `w-api-contracts` `00c8739`, `e9ecdf9` | OpenAPI lint, validation, and TS generation | COMPLETE |
| CA-004 | Public catalog API baseline available | `w-backend-service` `17e65e7` | Docker Maven `verify`: 35 tests | COMPLETE |

## Current task

No production frontend code changes. Keep the baseline compatible with `/home` and `/news/:id` while backend endpoints are implemented.

## Next tasks

- Integrate generated public API client after contract and backend readiness.
- Migrate one data flow at a time: carousel, catalog, content, pages, contacts, leads, then legacy compatibility.

## Blockers

- Carousel, content, managed-page, and lead endpoints are not implemented.
- The existing TypeScript build failure from unused `getS3FileUrl` imports is recorded in the validation audit and is outside Phase 0.

## Deviations from SDD

None.

## Known limitations

- Direct S3 JSON data flows remain active.
- Product related-material cards remain on current S3 data until `CO-002` can
  enrich the public product response with related-content summaries.
- Existing untracked `src/agentPromt.md` and `docs/BACKEND_AND_ADMIN_IMPLEMENTATION_PLAN.md` are preserved outside implementation commits.
