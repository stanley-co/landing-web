# Validation

Validate:

- required IDs and titles;
- unique IDs by entity type;
- content block types;
- image/PDF path format;
- related article IDs;
- product category presence;
- Rutube URL format;
- lead data is not migrated.

## Code Validation Addendum 2026-07-17

Additional required validations from real landing code:

- `materialsAndNews.articles` and legacy typo `materialsAndNews.atricles` are both accepted; typo usage is reported and normalized.
- `specs` is an arbitrary string map; unknown keys are valid and must not be dropped.
- Product without `galleryImages` is valid if `image` exists.
- Product video value `-` or blank is treated as absent.
- Content block types are limited to `paragraph`, `image`, `quote`, `link`.
- Carousel links must be classified as contact-modal, internal route, hash route or external URL.
- Category import must create top-level `globalCategory` and child `category` from current S3, not from the old frontend fallback list only.
