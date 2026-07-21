# ID Strategy

Use UUID primary keys internally. Preserve existing JSON IDs as `external_id` and keep them immutable.

Do not generate public slugs as replacements. Optional slug can be derived but nullable and not used by public routes.

Idempotency key: entity type + external ID.

## Code Validation Addendum 2026-07-17

Entity-specific rules:

- Products: preserve `product.id` as public ID for `/equipment/:id`.
- Content: preserve `news/article.id` as public ID for `/news/:id`; slug is nullable and not a route replacement.
- Slides: preserve S3 numeric `id` as external ID; order is source array order unless admin sort order is later changed.
- Categories: derive stable category external IDs from normalized names plus level, but preserve display names exactly for frontend grouping.
- Media: preserve S3 object key as stable identity for imported binaries.

Do not generate new public IDs during import.
