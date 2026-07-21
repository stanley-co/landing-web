# SDD Changelog

## 2026-07-18 Catalog Admin Editor Completion

- Completed the admin category/product workflow without a raw JSON editor:
  immutable IDs, recursive category lifecycle state, media selection,
  specifications, advantages, gallery, video URL, related materials, archive,
  and explicit ordering are represented as typed form controls.
- Added component coverage for category lifecycle edit initialization and all
  structured product editor groups. Admin commits: `b606a28`, `22c4e36`.
- Ralph loop advanced from `AD-003` to `AD-004`.

## 2026-07-18 Recursive Admin Category Status

- Corrected `AdminProductCategoryDto`: child nodes are now recursive admin
  nodes, not public `ProductCategoryDto` nodes.
- This matches the backend response and ensures category editors receive the
  required `DRAFT`/`ACTIVE`/`ARCHIVED` status at every hierarchy level.
- Public category data remains active-only and contains no lifecycle metadata;
  stable IDs and the `globalCategory/category` tree are unchanged.
- Contract correction: `w-api-contracts` commit `44b306c`.

## 2026-07-18 Content Editor Contract Correction

- Separated public rendered `ContentBlockDto.src` from admin
  `ContentBlockWriteDto`/`ContentBlockAdminDto.imageId`; editor writes must
  select registered media rather than submit a storage URL.
- Added stable-ID `POST /api/v1/admin/content/{id}/archive` and made public
  detail blocks required.
- Confirmed no content SEO, slug, category-tree, or content self-relation is
  added to the MVP; those features have no current landing data source.
- Recorded public content implementation `073808a` and contract correction
  `54c6318` in the Ralph loop.

## 2026-07-18 Content Admin API

- Implemented protected content list/create/read/update/archive under the
  preserved ID model in backend commit `ee69c39`.
- The editor accepts and returns `imageId` for media blocks; public API retains
  URLs. Ordered block replacement rejects duplicate order values and preserves
  media usage protection.
- `FEATURE_OWNER` has content write access, `CONTENT_READER` has read-only
  access, and create/update/archive create audit events.

## 2026-07-18 Content Boundary Correction

- Verified `RelatedNews` derives its cards from the loaded news/article list;
  the current JSON has no material-to-material relation fields.
- Kept product-to-content links in `product_related_content`, but removed the
  unsupported content self-relation and content-category CRUD/table from the
  MVP SDD and OpenAPI write model.
- Defined content `category` as a display/filter string and retained exactly the
  four current block types: `paragraph`, `image`, `quote`, and `link`.

## 2026-07-17 Validation Update

- Added code-based validation artifacts under `architecture-sdd/validation/`.
- Confirmed actual routes, including `/`, `/equipment`, `/equipment/:id`, `/information`, `/news` redirect, `/news/:id`, `/about`, `/contacts`, `/privacy-policy`, `/home`, and `*`.
- Confirmed current S3 JSON source of truth and fetched public objects read-only.
- Added current product, carousel and content schemas with field-level frontend consumers.
- Added explicit support for product `materialsAndNews.atricles` legacy typo.
- Added category hierarchy requirement based on real `globalCategory/category` values and explicit sort order.
- Confirmed `/news/:id` must remain ID-based; slug is nullable future only.
- Confirmed current content block types and preserved structured `ContentBlock`.
- Confirmed carousel public DTO compatibility and special `#contact-form` link behavior.
- Confirmed lead target: PostgreSQL + email notification, Telegram stub, Bitrix out of MVP.
- Added build/test results and current dependency audit result.
- Updated existing SDD files with validation addenda and links to this evidence.
