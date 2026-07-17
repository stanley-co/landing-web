# Content Editor

Routes: `/content/new`, `/content/:id`.

Fields: ID, type, title, preview, required category display string, cover, content blocks, status.

Blocks: paragraph, image, quote, link.

The current landing does not have an explicit material-to-material or
material-to-product editor. `RelatedNews` derives cards from the list and
product references are managed from the product editor; do not add a raw
relation picker to this screen.

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
