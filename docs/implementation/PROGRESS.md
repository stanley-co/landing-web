## Current phase

Phase 0 baseline recorded. Public frontend integration is intentionally deferred until public API contracts and backend endpoints exist.

## Completed tasks

| Task ID | Requirement | Commit | Tests | Status |
|---|---|---|---|---|
| PH0-LANDING-001 | Preserve baseline, routes, identifiers, and validated SDD package | Pending documentation commit | Existing build result is documented in `architecture-sdd/validation/LANDING_CODE_AUDIT.md` | COMPLETE |
| PH1-CONTRACTS-001 | Synchronize landing-facing API contract baseline | `w-api-contracts` `00c8739`, `e9ecdf9` | OpenAPI lint, validation, and TS generation | COMPLETE |
| CA-004 | Public catalog API baseline available | `w-backend-service` `17e65e7` | Docker Maven `verify`: 35 tests | COMPLETE |
| CA-006 | Catalog integration and OpenAPI compatibility coverage | `w-api-contracts` `1bf0099`, `w-backend-service` `35db438` | contract lint/validation/generation; Docker Maven `verify`: 36 tests | COMPLETE |
| CO-001 | Structured NEWS/ARTICLE data model | `w-backend-service` `985c7c1` | Flyway V10 and Docker Maven `verify`: 38 tests | COMPLETE |
| FE-001 | Generated typed public API client and environment-based base URL, without route/UI migration | Pending current commit | `npm run generate:api`, `npm run build` | COMPLETE |

## Current task

`FE-002`: move catalog list/categories/slides to public API only after slide and
managed-page endpoints are available. Existing routes and S3 fallback flows are
unchanged by `FE-001`.

## Next tasks

- Migrate one data flow at a time: carousel, catalog, content, pages, contacts, leads, then legacy compatibility.

## Blockers

- Carousel, content, managed-page, and lead endpoints are not implemented.
- Carousel, content, managed-page, and lead endpoints are not implemented.

## Deviations from SDD

### DEV-001: Content relations follow actual landing data

- Current news/articles have a display-category string and typed blocks, but no
  explicit material relation field. `RelatedNews` derives cards from the loaded
  list; product links stay in the catalog model.
- SDD and OpenAPI therefore omit content-category and content-self-relation CRUD.
- Compatibility: `/news/:id`, existing content IDs, and product article links
  are unchanged.

## Known limitations

- Direct S3 JSON data flows remain active.
- Product related-material cards remain on current S3 data until `CO-002` can
  enrich the public product response with related-content summaries.
- Existing untracked `src/agentPromt.md` and `docs/BACKEND_AND_ADMIN_IMPLEMENTATION_PLAN.md` are preserved outside implementation commits.
- `VITE_PUBLIC_API_BASE_URL` configures the generated public client; it defaults
  to `http://localhost:8080/api/v1`. The existing user-modified `.env.example`
  remains untouched.
