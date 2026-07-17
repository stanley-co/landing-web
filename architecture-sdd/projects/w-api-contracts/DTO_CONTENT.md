# DTO Content

DTOs:

- `ContentListItemDto`
- `ContentDetailDto`
- `ContentBlockDto`
- `ContentCategoryDto`

Content types: `NEWS`, `ARTICLE`. Public detail endpoint uses ID.

## Code Validation Addendum 2026-07-17

`ContentListItemDto` must include:

- `id`, `type`, `title`, `date`, `category`, `image`, `preview`.

`ContentDetailDto` must include:

- all list fields;
- ordered `blocks`;
- optional related summaries.

`ContentBlockDto` MVP types are limited to real frontend support:

- `paragraph`: `text`;
- `image`: `src`, optional `caption`;
- `quote`: `text`;
- `link`: `url`, optional `linkText`, optional `text`.

Do not expose a single `body` field as the source of rendered content. Existing `id` remains the public route key for `/news/:id`; slug is optional future metadata only.
