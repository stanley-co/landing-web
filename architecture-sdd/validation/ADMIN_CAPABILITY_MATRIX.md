# Admin Capability Matrix

## Managed Feature Capabilities

| Feature | List | Create | Read | Update | Archive | Reorder | Upload | Preview | Validation | Permissions | Audit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Products | yes | yes | yes | yes | yes | yes | images | card/detail | required fields, immutable ID, category, media, Rutube URL, related IDs | ADMIN/FEATURE_OWNER write; CONTENT_READER read | yes |
| Product categories | yes tree | yes | yes | yes | archive if unused | yes | no | public tree | no cycles, unique sibling names, preserve grouping | ADMIN/FEATURE_OWNER write | yes |
| Slides | yes | yes | yes | yes | yes | yes | image | carousel preview | active requires title/image; link action validation | ADMIN/FEATURE_OWNER write | yes |
| News/articles | yes | yes | yes | yes | yes | content block order | cover/block images | detail preview | block payload by type; existing ID immutable; `/news/:id` compatibility | ADMIN/FEATURE_OWNER write | yes |
| Media files | yes | upload only | yes | metadata | safe delete | n/a | yes | thumbnail/PDF metadata | MIME/size/checksum/S3 key | upload ADMIN/FEATURE_OWNER; delete ADMIN | yes |
| Documents | yes | yes | yes | yes | yes | yes | PDF | public link/PDF preview | PDF metadata, active requires file | ADMIN/FEATURE_OWNER write | yes |
| Certificates | yes | yes | yes | yes | yes | yes | PDF/image | certificate preview | title/file/status | ADMIN/FEATURE_OWNER write | yes |
| Leads | yes | public create only | yes | status/comment | no delete in MVP | n/a | no | detail | phone or email; consent; source; optional product | read ADMIN/FEATURE_OWNER/CONTENT_READER; status ADMIN/FEATURE_OWNER | yes |
| Settings contacts | grouped form | no generic CRUD | yes | yes | n/a | n/a | optional logo/social media | public contacts | email/phone/URL | ADMIN only for settings write | yes |
| Legacy blocks | yes | no default | yes | limited | yes | yes | optional | route preview | warn deprecated | ADMIN/FEATURE_OWNER | yes |

## Product Form Field Matrix

| Current field | Component | Type | Required | Backend field/entity | Admin form element | Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `id` | routes/cards/detail/search | string | yes | `products.external_id` | immutable text after import | unique, stable, no required slug |
| `name` | `ProductHeader`, cards, SEO | string | yes | `products.name` | text input | nonblank |
| `globalCategory` | `EquipmentPage`, `SearchModal` | string | yes for current grouping | parent `product_categories` | tree select | must exist; import from S3 |
| `category` | filter/cards/header chip | string | yes | child `product_categories` | dependent select | must exist under global category |
| `image` | cards/search/fallback gallery/SEO | S3 key/URL | yes for active | `product_media` main | media picker | image MIME/key required for ACTIVE |
| `galleryImages[]` | `ProductGallery` | ordered image keys | no | `product_media` | gallery picker + reorder | image refs exist |
| `description` | cards/header/SEO | string | yes | `products.short_description` | textarea | nonblank for ACTIVE |
| `fullDescription` | `ProductDescription` | string | no | `products.full_description` | rich/plain textarea | fallback to description allowed |
| `specs` | `ProductSpecs` | map | yes in current data | `product_specs` | repeating key/value table | key/value nonblank |
| `advantages[]` | `ProductDescription` | array | no | `product_advantages` | repeating group | icon valid or fallback; title/description required per row |
| `materialsAndNews.video` | `ProductVideo` | URL | no | `product_videos.url` | URL input | Rutube/permitted domain; `-` treated as empty during import |
| `materialsAndNews.articles` | `ProductRelatedArticles` | content IDs | no | `product_related_content` | content picker | target content exists |
| `materialsAndNews.atricles` | same | content IDs | no | import alias only | migration warning | preserve link, normalize to articles |
| array order | catalog | implicit | no | `products.sort_order` | numeric/order controls | stable order |
| status | future | enum | yes target | `products.status` | select | DRAFT/ACTIVE/ARCHIVED |

## Role Matrix

| Capability | ADMIN | FEATURE_OWNER | CONTENT_READER |
| --- | --- | --- | --- |
| product read | yes | yes | yes |
| product write | yes | yes | no |
| product archive | yes | yes | no |
| category reorder | yes | yes | no |
| content write | yes | yes | no |
| carousel write | yes | yes | no |
| page write | yes | yes | no |
| legacy write | yes | yes | no |
| media upload | yes | yes | no |
| media delete | yes | no | no |
| document write | yes | yes | no |
| certificate write | yes | yes | no |
| lead read | yes | yes | yes |
| lead status update | yes | yes | no |
| email retry | yes | yes | no |
| user management | yes | no | no |
| audit read | yes | no | yes |
| settings write | yes | no | no |
