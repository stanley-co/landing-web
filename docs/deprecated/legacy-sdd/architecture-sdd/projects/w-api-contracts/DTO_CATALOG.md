# DTO Catalog

Core DTOs:

- `ProductCardDto`
- `ProductDetailDto`
- `ProductAdminDto`
- `ProductCategoryDto`
- `ProductSpecDto`
- `ProductAdvantageDto`
- `ProductMediaDto`

`id` is existing public ID. Internal UUID may be `uuid` in admin DTO if needed.

## Code Validation Addendum 2026-07-17

`ProductDetailDto` must include all fields rendered by current `ProductDetailPage` in one response:

- `id`, `name`, `globalCategory`, `category`;
- `image`, ordered `galleryImages`;
- `description`, `fullDescription`;
- ordered `specs` key/value rows or a map preserving arbitrary keys;
- ordered `advantages` with `icon`, `title`, `description`;
- optional `videoUrl`;
- ordered related-content references by existing content ID and type. `summary` is
  optional until `CO-002` resolves the reference against the content module; the
  public frontend must not migrate the related-material cards before that task;
- SEO remains frontend-derived from product `name`, `description`, image, and
  existing ID; product-specific SEO is not a separate admin field because the
  current landing has no such source data.

`ProductCardDto` must include `id`, `name`, `globalCategory`, `category`, `image`, `description`.

`ProductCategoryDto` must represent a tree:

- top-level global category;
- child categories;
- `sortOrder`;
- `activeProductCount`;
- stable anchor/display name compatibility.

`AdminProductCategoryDto` is a recursive administrative tree node. Every node,
including every child category, contains `status`; it must not reuse
`ProductCategoryDto.children`, because the public tree deliberately omits
lifecycle state. Category creation uses an immutable explicit ID; updates and
archive operations address that ID in the path and must not replace it. A
category may be archived only after its products and child categories have been
moved or archived.

Compatibility:

- public identifier is existing `id`;
- slug is not required;
- `materialsAndNews.atricles` is migration input only and never appears in public DTO.

## CA-004 compatibility boundary

The catalog relation table is introduced before the NEWS/ARTICLE tables. Therefore
`ProductDetailDto.relatedContent` preserves every legacy relationship as
`ProductRelatedContentDto` (`id`, `type`, `sortOrder`) immediately. `summary` is
optional and is populated by `CO-002`; this is an additive, backward-compatible
enrichment. `FE-003` depends on both `CA-004` and `CO-002` because the existing
`ProductRelatedArticles` component renders article-card metadata, not bare IDs.

## Admin product editor boundary

`ProductWriteRequest` contains the immutable public `id` for create and must
match the path ID for update. It contains typed, ordered related-content rows
(`id`, `NEWS`/`ARTICLE` type, and `sortOrder`), not untyped IDs, so future
related news are not lost.
Manual product sort changes use `PUT /admin/products/reorder`. The form stores
`fullDescription`; an active product must also have a category, main image, and
nonblank short description. Product SEO is derived by the landing and has no
separate database or admin field.
