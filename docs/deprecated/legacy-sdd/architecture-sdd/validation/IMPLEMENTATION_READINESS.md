# Implementation Readiness

## Verdict

`READY_WITH_MINOR_CHANGES` for documentation. Core P0/P1 documentation gaps found during validation have been corrected or explicitly converted into acceptance criteria. The existing landing build itself is not clean and must be fixed before frontend migration work.

## Project Readiness

| Project | Ready to start? | Readiness | Blocking notes |
| --- | --- | ---: | --- |
| landing-web | yes, after build cleanup | 82% | `npm run build` fails on unused imports. |
| w-api-contracts | yes | 86% | Generate concrete response schemas before implementation. |
| w-api-gateway | yes | 90% | MVP gateway is backend edge layer, not separate deployable. |
| w-backend-service | yes | 87% | Start with catalog/content/slide/lead modules. |
| w-admin-web | yes | 84% | Product/content/slide forms must follow field matrices. |
| w-data-migrator | yes | 85% | Perform production S3 binary scan for files/PDFs. |
| w-platform-infra | yes | 82% | Secrets and bucket policies remain environment work. |

## Remaining P0/P1

No open documentation P0/P1 remains after this update.

Implementation risks to track:

- Landing build fails until unused imports are removed.
- Category order must be data-driven from imported S3 categories.
- Current S3 has one legacy typo `materialsAndNews.atricles`; migrator must normalize it.
- Certificate/document binary inventory needs a real S3 scan beyond JSON.

## First Implementation Slice

Start with `w-api-contracts` and `w-backend-service` for the catalog/content/slide/lead vertical:

1. Define concrete DTO schemas for product detail, category tree, slide, content detail and lead create.
2. Implement backend Flyway schema for `Product`, `ProductCategory`, `HeroSlide`, `ContentItem`, `ContentBlock`, `MediaFile`, `Lead`.
3. Implement `w-data-migrator` dry-run for current S3 JSON.
4. Implement admin screens for products, slides and content with acceptance tests.
5. Replace landing S3 calls with public API only after endpoints pass contract tests.

## Acceptance Examples

- Product specs: admin edits arbitrary spec key/value rows; PostgreSQL stores them; public DTO returns them; `ProductSpecs` displays the changed table.
- Carousel: admin creates active slide with image/order/link; public API returns it in order; `EquipmentCarousel` renders it without code change.
- Content detail: admin creates an ARTICLE with paragraph/image/quote/link blocks; `/news/:id` renders the same block sequence.
- Lead: product gallery CTA submits lead with product context; backend stores it, sends email, and returns normalized error on invalid contact data.
