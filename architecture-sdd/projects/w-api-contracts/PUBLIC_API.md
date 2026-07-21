# Public API

Required groups: site, menu, pages, products, categories, content, news by ID, slides, contacts, documents, certificates, leads.

Public API returns active content only.

## Code Validation Addendum 2026-07-17

Required current landing replacements:

| Current operation | Component | Endpoint | Compatibility |
| --- | --- | --- | --- |
| products list/catalog/search | `EquipmentPage`, `SearchModal`, `ProductsPreview` | `GET /api/v1/public/products` | supports `search`, category filtering and card fields |
| product detail | `ProductDetailPage` | `GET /api/v1/public/products/{id}` | `{id}` is existing product ID, not slug |
| category tree | `EquipmentFilter`, `Header` future | `GET /api/v1/public/product-categories` | tree preserves `globalCategory/category` grouping and counts |
| carousel | `EquipmentCarousel` | `GET /api/v1/public/slides?pageCode=equipment` | DTO compatible with current slide JSON |
| news/articles list | `InformationPage` | `GET /api/v1/public/content?type=NEWS|ARTICLE` | list fields match `NewsCard` |
| news/article detail | `NewsArticlePage` | `GET /api/v1/public/news/{id}` | searches both NEWS and ARTICLE by existing ID |
| leads | `CooperationForm` | `POST /api/v1/public/leads` | phone or email, consent, source/product context |

Public API must not require the landing to make many follow-up requests for product detail; specs, advantages, gallery, video and related content summaries are included in the detail DTO.
