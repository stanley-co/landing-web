# Content Editor

Routes: `/content/new`, `/content/:id`.

Fields: ID, optional slug, type, title, preview, category, cover, content blocks, related products, status.

Blocks: paragraph, image, quote, link.

Acceptance: existing ID immutable; slug not required; preview supported.

## Code Validation Addendum 2026-07-17

The current landing uses one content schema for both news and articles and renders detail at `/news/:id`.

Requirements:

- existing `id` is the public identifier and immutable after create/import;
- slug is optional future metadata and must not replace `/news/:id`;
- editor supports exactly current rendered block types: `paragraph`, `image`, `quote`, `link`;
- do not replace structured blocks with a single `body` field;
- cover image and image blocks use media picker;
- link blocks validate URL and have optional display text/description.

Acceptance: an item created as ARTICLE or NEWS opens through `/news/{id}` and renders blocks in order.
