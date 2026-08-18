# Contract Baseline 2026-07-17

`openapi/openapi.yaml` is the executable contract source under ADR-005. It supersedes incomplete illustrative response shapes in the earlier SDD draft.

Key corrections derived from landing validation:

- `GET /public/site` returns `SiteDto`, not a product list.
- `GET /public/pages/{route}` returns `PageDto`, not `ProductDetailDto`.
- Product detail is a single response with gallery, specifications, advantages,
  video URL, and stable related-content references. The content module adds
  optional summaries before the landing migrates related-material cards.
- `/public/news/{id}` accepts the existing news or article ID, preserving `/news/:id`.
- Public content blocks are restricted to the four block types rendered by the landing: `paragraph`, `image`, `quote`, and `link`.
- The administration contract includes explicit editor DTOs for products, categories, content, slides, pages, contacts, media, documents, certificates, leads, users, audit, and settings. It does not expose an unrestricted page-builder payload.
- Stable public IDs are caller-provided for imported products and content and immutable after creation.

The contract is validated with Redocly and includes reproducible TypeScript and Spring interface generation configuration. Java generation is a required check once Java 21 is available in the workspace.
