# DTO Content

DTOs:

- `ContentListItemDto`
- `ContentDetailDto`
- `ContentBlockDto`

Content types: `NEWS`, `ARTICLE`. Public detail endpoint uses ID.

## Code Validation Addendum 2026-07-17

`ContentListItemDto` must include:

- `id`, `type`, `title`, `date`, `category`, `image`, `preview`.

`ContentDetailDto` must include:

- all list fields;
- ordered `blocks`;
- optional derived SEO metadata.

`ContentBlockDto` MVP types are limited to real frontend support:

- `paragraph`: `text`;
- `image`: `src`, optional `caption`;
- `quote`: `text`;
- `link`: `url`, optional `linkText`, optional `text`.

Do not expose a single `body` field as the source of rendered content. Existing `id` remains the public route key for `/news/:id`; slug is optional future metadata only.

`category` is a display/filter string from the current S3 JSON. The landing has
no content-category tree or explicit content-to-content links: `RelatedNews`
derives cards from the loaded list. Therefore neither a content-category DTO nor
`relatedContentIds` belongs in the MVP write model. Product-to-content links are
separate catalog data.
