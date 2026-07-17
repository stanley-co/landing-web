# content Module

Purpose: news and articles.

Scope: `NEWS`, `ARTICLE`, ID-based route `/news/:id`, content blocks, cover image, related products/content, search, filters, status, admin editor, public API.

Entities/tables: `content_categories`, `content_items`, `content_blocks`, relation tables.

Public identifier: existing ID. `slug` nullable future field, not required by public API.

Controllers: `/public/content`, `/public/news/{id}`, `/admin/content`.

Validation: unique external ID, active item needs title/preview/type/date, block payload valid by type.

Permissions: read all admin roles; write `ADMIN`/`FEATURE_OWNER`.

Tests: mixed news/article lookup by ID, block rendering DTO, active filtering, import.

## Code Validation Addendum 2026-07-17

Evidence:

- `src/routes/InformationPage.tsx` loads `S3_URLS.NEWS` and `S3_URLS.ARTICLES` separately, then filters/searches each tab in browser state.
- `src/routes/NewsArticlePage.tsx` merges news and articles and finds detail by existing `id` for route `/news/:id`.
- `src/components/ArticleBody/ArticleBody.tsx` renders only `paragraph`, `image`, `quote`, and `link` blocks.

Required target behavior:

- Keep public detail endpoint ID-based: `GET /api/v1/public/news/{id}` finds both NEWS and ARTICLE. Slug remains nullable future metadata only.
- Preserve structured `ContentBlock`; do not collapse content to a single `body` string.
- Supported MVP block types are exactly the rendered types: `paragraph`, `image`, `quote`, `link`.
- Public list DTO must include `id`, `title`, `date`, `category`, `image`, `preview`, and `type` so `/information` can reproduce current cards/tabs.
- Image block `src` and cover `image` are media references; external link blocks are URL metadata.

Acceptance:

- Migrated NEWS and ARTICLE objects both open at `/news/:id`.
- Admin creates a paragraph/image/quote/link sequence and public detail returns blocks in the same order.
