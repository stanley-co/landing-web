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
- related article summaries by existing content ID;
- `seo` derived from product fields where explicit SEO is absent.

`ProductCardDto` must include `id`, `name`, `globalCategory`, `category`, `image`, `description`.

`ProductCategoryDto` must represent a tree:

- top-level global category;
- child categories;
- `sortOrder`;
- `activeProductCount`;
- stable anchor/display name compatibility.

Compatibility:

- public identifier is existing `id`;
- slug is not required;
- `materialsAndNews.atricles` is migration input only and never appears in public DTO.
