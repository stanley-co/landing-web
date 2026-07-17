# API Integration Map

| Component | Current source | New endpoint | DTO | Loading | Error | Empty | Cache |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Header | TS arrays | `/public/menu/header` | MenuDto | keep header, skeleton optional | fallback static minimal | minimal menu | stale 10m |
| EquipmentCarousel | S3 carousel | `/public/slides?pageCode=equipment` | SlideDto[] | current spinner | hide carousel | null | stale 5m |
| EquipmentPage | S3 products | `/public/product-categories`, `/public/products` | CategoryDto/ProductCardDto | existing spinner/skeleton | error panel | no products | query cache |
| SearchModal | S3 products | `/public/products?search=` | ProductSearchDto[] | spinner | inline error | nothing found | debounce |
| ProductDetailPage | S3 products/articles | `/public/products/{id}` | ProductDetailDto | full-page spinner/skeleton | 404/error | not found | stale 5m |
| InformationPage | S3 news/articles | `/public/content` | ContentListDto | spinner | error panel | no results | query cache |
| NewsArticlePage | S3 news/articles | `/public/news/{id}` | ContentDetailDto | spinner/skeleton | 404 | not found | stale 5m |
| AboutPage | JSX | `/public/pages/about` | PageDto | section skeleton | fallback/error | hidden empty sections | stale 10m |
| ContactsPage | JSX/form | `/public/contacts`, `/public/leads` | ContactDto/LeadRequest | form pending | validation errors | no contacts | stale 10m |
| PrivacyPolicyPage | JSX | `/public/pages/privacy-policy` | PageDto | skeleton | error | unavailable | stale 1h |
| HomePage | mixed legacy | `/public/pages/home`, `/public/legacy` | PageDto/LegacyBlockDto | skeleton | error | show nothing | stale 10m |

## Code Validation Addendum 2026-07-17

Current S3 replacement details:

- `EquipmentCarousel` public DTO must match current `CarouselSlide`: `id`, `image`, `title`, `description`, `link`, `buttonText`.
- `ProductDetailPage` should use one detail request containing specs, advantages, gallery, video and related articles.
- `NewsArticlePage` calls `/public/news/{id}` where `{id}` is the existing JSON `id` from either news or articles.
- `SearchModal` searches product `name`, `category`, `description`, and `globalCategory`; backend search should cover the same fields.
- Lead form integration replaces browser-side Telegram/Bitrix calls with `POST /public/leads`; Telegram is stub and Bitrix is out of MVP.
