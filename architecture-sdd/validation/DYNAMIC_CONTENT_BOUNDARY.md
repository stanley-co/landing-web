# Dynamic Content Boundary

The admin panel is not a React page builder. It manages business content and operational data that the current landing already treats as data.

| Element | Current location | Change frequency | Who changes | Target category | Admin | Rationale |
| --- | --- | --- | --- | --- | --- | --- |
| Products | S3 `data/products/products.json` | regular | catalog/content owner | ADMIN_MANAGED | yes | Product cards/detail pages/search depend on it. |
| Product categories | S3 fields + hardcoded fallback/order | regular enough | catalog owner | ADMIN_MANAGED | yes | Current grouping uses `globalCategory/category`; target must preserve grouping and sort order. |
| Product images/gallery | S3 media keys | regular | catalog owner | ADMIN_MANAGED | yes | Used in cards, gallery, SEO. |
| Product specs | S3 `specs` map | regular | catalog owner | ADMIN_MANAGED | yes | Rendered as technical table. |
| Product advantages | S3 `advantages[]` + fallback | regular | catalog owner | ADMIN_MANAGED | yes | Business selling points; fallback remains frontend compatibility. |
| Product Rutube URL | S3 `materialsAndNews.video` | occasional | catalog owner | ADMIN_MANAGED | yes | URL metadata; not a binary upload. |
| Related product articles | S3 `materialsAndNews.articles/atricles` | occasional | catalog/content owner | ADMIN_MANAGED | yes | Cross-links on product detail. |
| Carousel slides | S3 `data/carousel/carousel.json` | regular | content owner | ADMIN_MANAGED | yes | Main dynamic banner. |
| News | S3 `data/news/news.json` | regular | content owner | ADMIN_MANAGED | yes | Business content. |
| Articles | S3 `data/articles/articles.json` | regular | content owner | ADMIN_MANAGED | yes | Structured blocks, related content. |
| Article block links | S3 content blocks | occasional | content owner | ADMIN_MANAGED | yes | Business external links inside articles only. |
| Leads | Browser forms | regular | sales/admin | ADMIN_MANAGED | yes | Must persist in PostgreSQL and notify by email. |
| Certificates/PDF | Currently JSX placeholders; requirement says S3 binaries + metadata | occasional | site owner | ADMIN_MANAGED | yes | Required by approved decision for PDF/certificates. |
| Documents | Not currently dynamic except privacy link; requirement says PDFs in S3 + metadata | occasional | site/legal owner | ADMIN_MANAGED | yes | Manage legal/marketing PDFs without redeploy. |
| Contacts | JSX in `Footer`, `ContactInfo`, privacy page | occasional | site owner | BACKEND_CONFIG or ADMIN_MANAGED setting | settings form | Low-volume site settings, not CRUD per text line. |
| Social links | JSX footer/share logic | rare | site owner | BACKEND_CONFIG/FRONTEND_STATIC | settings only for owned profiles | Share URLs remain frontend-only; Rutube profile can be setting. |
| Header menu labels | JSX arrays | rare | product/frontend | FRONTEND_STATIC initially | no MVP CRUD | Coupled to routes and anchors; avoid menu builder unless business asks. |
| SEO defaults | JSX props + `VITE_SITE_URL` | occasional | site/content owner | ADMIN_MANAGED for dynamic entities; FRONTEND_STATIC for static pages | entity forms/settings | Product/content SEO derives from entity fields; static page SEO can be limited settings. |
| Privacy policy text | JSX | occasional/legal | legal/site owner | ADMIN_MANAGED document or page setting | yes, limited editor | Legal text has business owner; no page builder needed. |
| `/home` legacy blocks | JSX + S3 previews | rare | site owner | LEGACY_MANAGED | optional/future | Preserve route and blocks; do not block MVP on full management. |
| Layout/CSS/components/icons | code | developer-controlled | frontend | FRONTEND_STATIC | no | UI implementation, not content. |
| Loading/error text | code | rare | frontend | FRONTEND_STATIC | no | Technical UI state. |
| S3 host/bucket/credentials | env/infra | operational | infra | INFRA_CONFIG | no CRUD | Secrets/config. |
| SMTP recipient/upload limits/Rutube allowed domains | backend config | operational | admin/infra | BACKEND_CONFIG | settings only where safe | Not public content. |
| Roles/permissions/security headers | backend/gateway config | operational | engineering/admin | BACKEND_CONFIG/INFRA_CONFIG | no content CRUD | Security model. |

## Decisions

- Use subject entities for stable business structures: `Product`, `ProductCategory`, `ProductSpec`, `ProductAdvantage`, `ProductMedia`, `HeroSlide`, `ContentItem`, `ContentBlock`, `Certificate`, `Document`, `Lead`.
- Use limited settings for contacts, owned social profile links and static-page SEO. Do not create CRUD for every footer phrase.
- Do not model frontend share links, route names, CSS, Ionic icons, validation implementation or fallback loading states as editable content.
- Keep `/home` as compatibility legacy. It may have `LegacyBlock` documentation for later migration, but public frontend route remains.
