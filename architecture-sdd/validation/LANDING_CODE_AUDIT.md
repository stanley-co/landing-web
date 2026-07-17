# Landing Code Audit

Дата аудита: 2026-07-17. Корень проекта: `/home/dds/dev/stanley-co/web/landing-web`.

## Project Structure

Фактический frontend: Vite + React 19 + Ionic React + React Router v6.

Ключевые файлы:

| Area | Files |
| --- | --- |
| Package/build | `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json` |
| Entry/router | `src/main.tsx`, `src/App.tsx` |
| Pages | `src/routes/*Page.tsx` |
| Components | `src/components/**` |
| Types | `src/types/product.ts`, `src/types/news.ts` |
| S3/data | `src/utils/fetchStaticData.ts`, `src/data`, `src/data_v2` |
| Deploy | `Dockerfile`, `nginx.conf`, `deploy/nginx.conf`, `.github/workflows/deploy.yaml` |
| Env examples | `.env.example`, `env.example`, `deploy/.env` |

## Routes

| Route | Page | Layout | Data source | Notes |
| --- | --- | --- | --- | --- |
| `/` | `EquipmentPage` | `PageWrapper` + `IonContent` | S3 products + carousel | Public catalog landing. Must remain compatible. |
| `/equipment` | `EquipmentPage` | same | S3 products + carousel | Catalog with filters and category anchors. |
| `/equipment/:id` | `ProductDetailPage` | same | S3 products + articles | Finds product by existing `id`; no slug required. |
| `/information` | `InformationPage` | same | S3 news + articles | Hashes `#articles` and `#news` switch tabs and scroll. |
| `/news` | `Navigate` | n/a | n/a | Redirects to `/information#news`; legacy route behavior. |
| `/news/:id` | `NewsArticlePage` | same | S3 news + articles | Finds by existing `id` in both arrays. Do not replace with required slug. |
| `/about` | `AboutPage` | same | JSX hardcode | Certificates/clients sections are disabled with `{false && ...}`. |
| `/contacts` | `ContactsPage` | same | JSX hardcode + cooperation form | Contact data hardcoded. |
| `/privacy-policy` | `PrivacyPolicyPage` | same | JSX hardcode | Legal text, effective date `07.03.2026`. |
| `/home` | `HomePage` | same | Mixed legacy JSX + S3 previews | Legacy page, must not be removed. |
| `*` | `NotFoundPage` | same | none | 404 page. |

## Network Requests

| Source | URL / target | Method | Behavior | Future replacement |
| --- | --- | --- | --- | --- |
| `fetchStaticData<T>` | `${VITE_S3_HOST || https://storage.yandexcloud.net}/${VITE_S3_BUCKET || stanley-co}/data/products/products.json` | GET | In-memory 5 min cache; `cache: no-cache`; throws on non-2xx. | `GET /api/v1/public/products`, `GET /api/v1/public/products/{id}`. |
| `fetchStaticData<T>` | `/data/news/news.json` | GET | Same. | `GET /api/v1/public/content?type=NEWS`, `GET /api/v1/public/news/{id}`. |
| `fetchStaticData<T>` | `/data/articles/articles.json` | GET | Same. | `GET /api/v1/public/content?type=ARTICLE`, detail through `/public/news/{id}`. |
| `fetchStaticData<T>` | `/data/carousel/carousel.json` | GET | Same; carousel hides itself on error/empty. | `GET /api/v1/public/slides?pageCode=equipment`. |
| `CooperationForm` | `https://api.telegram.org/bot${token}/sendMessage` | POST | Only if `VITE_FORM_SUBMISSION_TARGET=telegram`; 30s timeout. | Backend lead create + email; Telegram stub only. |
| `CooperationForm` | `VITE_BITRIX_WEBHOOK_URL` | POST | Only if target `bitrix`; demo mode when not configured; 30s timeout. | Out of MVP. Do not keep browser-side Bitrix integration. |
| `ArticleShare` | Facebook/LinkedIn/Telegram share URLs, `mailto:` | browser navigation | Frontend-only share links. | Stay frontend static. |
| `ProductVideo` | Rutube embed URL derived from `materialsAndNews.video` | iframe | Converts `https://rutube.ru/video/{id}/` to `/play/embed/{id}/`. | Backend validates permitted video domains; video remains URL metadata, not S3 file. |
| `index.html` | Yandex Metrika `https://mc.yandex.ru/...` | script/img | Static analytics snippet. | Frontend/infra config, not admin CRUD. |

## Current S3 Data

Read-only S3 fetch succeeded during audit.

| Object | Count | Consumer | Schema |
| --- | ---: | --- | --- |
| `data/products/products.json` | 37 | `EquipmentPage`, `ProductDetailPage`, `SearchModal`, `ProductsPreview` | `Product[]` |
| `data/carousel/carousel.json` | 3 | `EquipmentCarousel` | `CarouselSlide[]` |
| `data/news/news.json` | 1 | `InformationPage`, `NewsArticlePage`, `NewsPreview` | `News[]` |
| `data/articles/articles.json` | 1 | `InformationPage`, `NewsArticlePage`, `ProductRelatedArticles` | `News[]` reused for articles |

Local `src/data_v2` matched the fetched examples structurally, but migration source remains current S3.

## Product Runtime Schema

Fields used by code:

| Field | Used by | Required now | Notes |
| --- | --- | --- | --- |
| `id` | routes, cards, related links | yes | Existing public ID; immutable after import. |
| `name` | header/cards/gallery/form context/SEO | yes | Product name. |
| `globalCategory` | catalog grouping/search | effectively yes in S3 | Fallback mapping exists for old data. |
| `category` | filters/header chip/cards | yes | Subcategory display name. |
| `image` | card/search/fallback gallery/SEO | yes | Relative S3 key or absolute URL. |
| `galleryImages[]` | product gallery | no | If empty, detail uses `image`; if no images, gallery hides. |
| `description` | card/header/SEO/fallback body | yes | Short description. |
| `fullDescription` | product description | no | Falls back to `description`. |
| `specs` | `Object.entries` in `ProductSpecs` | yes | Arbitrary key/value map; labels may be raw Russian keys. |
| `advantages[]` | description advantages | no | Falls back to four hardcoded default advantages. |
| `materialsAndNews.video` | `ProductVideo` | no | Rutube URL; hidden when empty or `-`. |
| `materialsAndNews.articles` | related articles | no | Article IDs. |
| `materialsAndNews.atricles` | related articles | no | Legacy typo supported and present in current S3 once. |

Current S3 category facts:

| Field | Values |
| --- | --- |
| `globalCategory` | `Водоподготовка`, `Насосное оборудование`, `Оборудование для приготовления и хранения`, `СИП станции`, `Фасовочное оборудование` |
| `category` examples | `Автоматические машины`, `Водоподготовка`, `Реакторы`, `Резервуар для хранения`, `Роторные насосы`, `Этикеровочная машина` |

The hardcoded `EquipmentPage` fallback subcategory order does not cover all current S3 categories. Target category model must import real S3 categories and expose explicit manual order.

## Content Runtime Schema

News and articles use the same TypeScript shape:

```text
id, title, date, category?, image, preview, content[]
```

Supported content block types in actual S3/code: `paragraph`, `image`, `quote`. Code also supports `link`; no current fetched S3 link block was found, but the admin editor must preserve support because `ArticleBody` renders it.

## Forms and Leads

| Form | Fields | Current delivery | Future target |
| --- | --- | --- | --- |
| `CooperationForm` | company, name, secondName, lastName, phone, email, comment, consent, optional productName | Telegram or Bitrix from browser env; demo mode possible | `Lead` in PostgreSQL, email notification, Telegram stub, Bitrix out of MVP. |
| `ContactForm` | name, tel, email, message, consent | Alert only; not mounted by current `ContactsPage` | Not a separate backend contract unless reintroduced. |
| Product modal | Same `CooperationForm` + productName context | Opens from header/carousel/gallery | Store `source`, optional `productId/productName`, form type. |

## Static and Legacy

Static by design: layout, CSS, Ionic icons, loading states, skeleton-like spinners, router paths, validation rules, Yandex Metrika snippet, share links, API/S3 host and bucket names, credentials and secrets.

Legacy: `/home` remains available and includes `Hero`, `AboutSection`, `Features`, `ProductsPreview`, `Advantages`, `Certificates`, `NewsPreview`. Do not remove or redirect unless explicitly approved later.

Conditionally managed: contacts/footer/social links/legal text/about page/SEO may be settings or limited page sections, not universal page-builder data.

## Build and Checks

Commands run:

| Command | Result |
| --- | --- |
| `npm install` | Success. npm reported 21 vulnerabilities: 8 moderate, 8 high, 5 critical. |
| `npm run build` | Failed at `tsc` because of unused imports. |

Build errors:

```text
src/components/ContactForm/ContactForm.tsx(5,1): error TS6133: 'getS3FileUrl' is declared but its value is never read.
src/components/CooperationForm/CooperationForm.tsx(6,1): error TS6133: 'getS3FileUrl' is declared but its value is never read.
src/components/NewsSubscribeCTA/NewsSubscribeCTA.tsx(4,1): error TS6133: 'getS3FileUrl' is declared but its value is never read.
```

Production code was not modified by this validation task.
