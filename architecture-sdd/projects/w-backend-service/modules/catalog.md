# catalog Module

Purpose: products and categories.

Scope: category tree, existing product IDs, specs, advantages, media, video, related content, sort order, statuses, public list/detail, admin CRUD, import support.

Entities/tables: `product_categories`, `products`, `product_specs`, `product_advantages`, `product_media`, `product_videos`, `product_related_content`.

Repositories: category/product repositories, specifications for filtering/search.

Services: `ProductService`, `CategoryService`, `ProductImportService`.

Controllers: public products/categories; admin products/categories.

DTO: list card, detail, category tree, admin edit DTO.

Validation: immutable external ID, category exists, active product requires name/category/description/main media.

Permissions: read all roles; write/archive/reorder `ADMIN` and `FEATURE_OWNER`.

Events: product changed for search/cache invalidation future.

Errors: duplicate ID, category in use, product not found.

Audit: all admin writes.

Tests: public active filtering, ID lookup, import, specs mapping, RBAC.

Order: after storage basics.

## Code Validation Addendum 2026-07-17

Evidence:

- `src/routes/EquipmentPage.tsx` loads `S3_URLS.PRODUCTS`, groups by `globalCategory`, filters by `category`, computes counts and keeps a hardcoded compatibility order.
- `src/routes/ProductDetailPage.tsx` loads products and articles, finds product by existing `id`, renders gallery, specs, advantages, video and related articles.
- `src/types/product.ts` includes legacy typo `materialsAndNews.atricles`; current S3 contains this key once and the frontend supports it.

Required target behavior:

- Preserve existing product `id` as immutable public identifier. Do not require slug for `/equipment/:id`.
- Import real S3 `globalCategory/category` values into a tree with explicit `sort_order`; do not rely only on old hardcoded subcategory lists.
- Store product specs as ordered arbitrary key/value rows. Do not model specs as a fixed enum of columns.
- Store `image` and ordered `galleryImages` as media references. Public detail must include enough data for `ProductGallery` without extra requests.
- Store advantages as ordered rows with `icon`, `title`, `description`; frontend fallback defaults are compatibility only and not a substitute for migration.
- Store product video as URL metadata, validate permitted domains including Rutube, and do not treat it as uploaded binary.
- Normalize both `materialsAndNews.articles` and legacy `materialsAndNews.atricles` into related content links; migrator must report typo usage without dropping links.

Acceptance:

- A migrated product with arbitrary Russian spec keys renders the same rows through `ProductSpecs`.
- A product with only `image` and no `galleryImages` still returns a valid detail DTO and gallery fallback.
- A product with `materialsAndNews.atricles` links to the same article after import.
