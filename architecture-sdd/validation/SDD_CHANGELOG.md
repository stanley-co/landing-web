# SDD Changelog

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
