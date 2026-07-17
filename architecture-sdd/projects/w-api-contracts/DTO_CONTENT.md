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

`ContentBlockDto` MVP types are limited to real frontend support:

- `paragraph`: `text`;
- `image`: `src`, optional `caption`;
- `quote`: `text`;
- `link`: `url`, optional `linkText`, optional `text`.

Do not expose a single `body` field as the source of rendered content. Existing `id` remains the public route key for `/news/:id`. Slug metadata is future scope and has no MVP storage, API, or admin field.

`category` is a required display/filter string in the current S3 JSON. The landing has
no content-category tree or explicit content-to-content links: `RelatedNews`
derives cards from the loaded list. Therefore neither a content-category DTO nor
`relatedContentIds` belongs in the MVP write model. Product-to-content links are
separate catalog data.

The current landing derives document title, description, image, and canonical
path from content fields and its existing ID. Do not add separate content SEO
fields to the public DTO or the admin write DTO in this MVP.
