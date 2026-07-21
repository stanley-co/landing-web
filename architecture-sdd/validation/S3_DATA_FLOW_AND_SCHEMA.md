# S3 Data Flow and Schema

S3 host defaults are defined in `src/utils/fetchStaticData.ts`: `VITE_S3_HOST || https://storage.yandexcloud.net`, `VITE_S3_BUCKET || stanley-co`.

No secrets are required for current public JSON reads. Do not publish S3 credentials in documentation.

## Objects

| URL | Bucket | Object key | Format | Consumers | Cache/error | Target |
| --- | --- | --- | --- | --- | --- | --- |
| `https://storage.yandexcloud.net/stanley-co/data/products/products.json` | `stanley-co` | `data/products/products.json` | JSON array | `EquipmentPage`, `ProductDetailPage`, `SearchModal`, `ProductsPreview` | 5 min memory cache; throws to page error; consumers may fallback to empty arrays | PostgreSQL catalog tables; public/admin APIs. |
| `https://storage.yandexcloud.net/stanley-co/data/carousel/carousel.json` | `stanley-co` | `data/carousel/carousel.json` | JSON array | `EquipmentCarousel` | 5 min memory cache; carousel hides on error/empty | `slides` table + media metadata. |
| `https://storage.yandexcloud.net/stanley-co/data/news/news.json` | `stanley-co` | `data/news/news.json` | JSON array | `InformationPage`, `NewsArticlePage`, `NewsPreview` | 5 min memory cache; detail catches empty | `content_items` type NEWS + blocks. |
| `https://storage.yandexcloud.net/stanley-co/data/articles/articles.json` | `stanley-co` | `data/articles/articles.json` | JSON array | `InformationPage`, `NewsArticlePage`, `ProductRelatedArticles` | 5 min memory cache; detail catches empty | `content_items` type ARTICLE + blocks. |
| `${S3_BASE_URL}/{relativePath}` | `stanley-co` | `images/**`, `docs/**` | binary | product/card/gallery/article/slide/document consumers | Browser direct URL | S3 remains source of truth for binaries; PostgreSQL stores metadata and references. |

## Product Schema

Current fetched S3: 37 products.

```text
Product {
  id: string
  name: string
  globalCategory?: string
  category: string
  image: string
  galleryImages?: string[]
  description: string
  specs: Record<string,string>
  fullDescription?: string
  advantages?: { icon: string, title: string, description: string }[]
  materialsAndNews?: {
    video?: string
    articles?: string[]
    atricles?: string[] // legacy typo
  }
}
```

Migration mapping:

| Source | Target |
| --- | --- |
| `id` | `products.external_id`, immutable public ID |
| `globalCategory` | parent `product_categories.external_id/name` |
| `category` | child `product_categories.external_id/name` |
| array order | `products.sort_order` within category when no explicit order exists |
| `image` | main `product_media` + `media_files.s3_key` |
| `galleryImages[]` | ordered `product_media` |
| `specs` entries | ordered `product_specs` |
| `advantages[]` | ordered `product_advantages`; icon is enum/string validated against allowed frontend icon names |
| `materialsAndNews.video` | `product_videos.url`, validated as Rutube or allowed external video URL |
| `materialsAndNews.articles/atricles` | `product_related_content.content_external_id`; preserve typo input compatibility |

## Carousel Schema

Current fetched S3: 3 slides.

```text
CarouselSlide {
  id: number
  image: string
  title: string
  description: string
  link?: string
  buttonText?: string
}
```

Order is array order. Current code has no separate `visible`, `actionType` or adaptive image fields. Target may add status and sort order, but must export a DTO compatible with current rendering: `id`, `image`, `title`, `description`, `link`, `buttonText`.

Special link behavior:

| Link | Behavior |
| --- | --- |
| `#contact-form` | Opens modal contact form. |
| `http://` / `https://` | Opens new tab with noopener/noreferrer. |
| `#anchor` | Scrolls current page; if missing, navigates to `/home#anchor`. |
| `/path#anchor` | Navigates then scrolls with retry. |
| `/path` | React Router navigate. |

## News and Articles Schema

Current fetched S3: 1 news, 1 article.

```text
ContentItem {
  id: string
  title: string
  date: string // yyyy-mm-dd in current data
  category?: string
  image: string
  preview: string
  content: ContentBlock[]
}

ContentBlock =
  | { type: "paragraph", text: string }
  | { type: "image", src: string, caption?: string }
  | { type: "quote", text: string }
  | { type: "link", url: string, linkText?: string, text?: string }
```

Fetched block type counts: `paragraph` 44, `image` 2, `quote` 4. `link` is supported by `ArticleBody` and templates even if absent in current fetched objects.

Migration mapping:

| Source | Target |
| --- | --- |
| S3 object path | `content_items.type` NEWS or ARTICLE |
| `id` | immutable `content_items.external_id` |
| `title`, `date`, `category`, `image`, `preview` | content item columns + media reference |
| `content[]` order | `content_blocks.sort_order` |
| image block `src` | media metadata reference |
| link block fields | URL fields, validated as external link |

## Local Data Comparison

`src/data` and `src/data_v2` are comparison snapshots only. `src/data_v2` structurally matched the fetched S3 examples during this audit, but migrator must read current S3.

## Migration Table

| S3 object | Data type | Current consumer | Target tables | ID strategy | File references | Validation | Import order |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `data/products/products.json` | products/catalog | catalog, search, product detail, previews | `product_categories`, `products`, child tables, `media_files` | Preserve `id`; derive category IDs from names | `image`, `galleryImages` | required id/name/category/image/description/specs; duplicate IDs; dangling article IDs; `atricles` typo | after media scan, before related content verification |
| `data/carousel/carousel.json` | slides | equipment carousel | `slides`, `media_files` | preserve numeric `id` as `external_id` string/number normalized | `image` | title/image required for ACTIVE; link behavior whitelist | after media scan |
| `data/news/news.json` | content NEWS | information and detail | `content_items`, `content_blocks`, `media_files` | preserve `id` | cover `image`, image block `src` | valid date/type/block payload; category is a display string | before product related verification |
| `data/articles/articles.json` | content ARTICLE | information, detail, product related | same | preserve `id` | cover `image`, image block `src` | valid date/type/block payload; no self-relation data in source | before product related verification |
| `images/**` | binaries | images in cards/galleries/articles/slides | `media_files` | S3 key stable | object key | existence/MIME/size/checksum if available | first |
| `docs/**` / certificates | PDFs | document/certificate screens | `documents`, `certificates`, `media_files` | generated UUID + stable S3 key | object key | PDF MIME, metadata required | with media scan |
