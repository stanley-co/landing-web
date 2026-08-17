# Landing Feature Inventory

## Dynamic Classification

| ID | Route | Feature | Components | Current source | Class | Data owner |
| --- | --- | --- | --- | --- | --- | --- |
| LF-001 | all | Header desktop/mobile navigation | `Header` | JSX arrays | B/C | Product owner for labels; frontend for behavior |
| LF-002 | all | Product search modal | `SearchModal` | S3 products | A | Content/catalog owner |
| LF-003 | all | Footer contacts/social/links | `Footer` | JSX hardcode + external Rutube logo URL | B | Site owner |
| LF-004 | all | Contact modal CTA | `ContactFormModal`, `CooperationForm` | form state/env integrations | A | Sales/admin |
| LF-005 | all | SEO/canonical/OG | `DocumentHead` | JSX props + env site URL | B/C | Site owner + frontend |
| LF-006 | all | Yandex Metrika | `index.html` | static script | C | Infra/frontend |
| LF-007 | `*` | 404 | `NotFoundPage` | JSX | C | Frontend |
| LF-101 | `/`, `/equipment` | Equipment carousel | `EquipmentCarousel` | S3 carousel JSON | A | Content owner |
| LF-102 | `/`, `/equipment` | Catalog product list/cards | `EquipmentPage`, `EquipmentLayout`, `EquipmentCard` | S3 products | A | Catalog owner |
| LF-103 | `/`, `/equipment` | Category tree/filter/counts | `EquipmentPage`, `EquipmentFilter` | S3 products + hardcoded order/fallback | A | Catalog owner |
| LF-104 | `/`, `/equipment` | Loading/error/empty catalog states | `EquipmentPage` | React state | C | Frontend |
| LF-201 | `/equipment/:id` | Product header | `ProductHeader` | S3 product | A | Catalog owner |
| LF-202 | `/equipment/:id` | Product gallery and lead CTA | `ProductGallery` | S3 product `galleryImages/image` | A | Catalog owner |
| LF-203 | `/equipment/:id` | Product description | `ProductDescription` | S3 product | A | Catalog owner |
| LF-204 | `/equipment/:id` | Product advantages | `ProductDescription` | S3 product + fallback JSX | A/B | Catalog owner |
| LF-205 | `/equipment/:id` | Product specs | `ProductSpecs` | S3 `specs` map | A | Catalog owner |
| LF-206 | `/equipment/:id` | Product video | `ProductVideo` | S3 Rutube URL | A | Catalog owner |
| LF-207 | `/equipment/:id` | Related articles | `ProductRelatedArticles` | S3 product article IDs + S3 articles | A | Catalog/content owners |
| LF-208 | `/equipment/:id` | Product SEO | `DocumentHead` | S3 product | A | Catalog owner |
| LF-301 | `/information` | News/articles tabs | `InformationPage` | S3 news/articles | A | Content owner |
| LF-302 | `/information` | Search/date filters | `InformationPage` | S3 news/articles + UI state | A/C | Content owner/frontend |
| LF-303 | `/information` | Content cards | `NewsGrid`, `NewsCard` | S3 news/articles | A | Content owner |
| LF-304 | `/news/:id` | Material detail lookup | `NewsArticlePage` | S3 news + articles by ID | A | Content owner |
| LF-305 | `/news/:id` | Material hero/body/share/related | `ArticleHero`, `ArticleBody`, `ArticleShare`, `RelatedNews` | S3 material + frontend share URLs | A/C | Content owner/frontend |
| LF-306 | `/news` | Legacy news redirect | `Navigate` | router | C/DEPRECATED | Frontend |
| LF-401 | `/about` | About/mission/competences | `AboutPage`, `CompanyIntro` | JSX | B | Site owner |
| LF-402 | `/about`, `/home` | Certificates | `Certificates` | JSX; disabled on `/about`, shown on `/home` | B | Site owner |
| LF-403 | `/about` | Disabled clients block | `AboutPage` | JSX behind `{false}` | DEPRECATED_STATIC | Frontend/site owner |
| LF-501 | `/contacts` | Contact info | `ContactInfo` | JSX | B | Site owner |
| LF-502 | `/contacts` | Cooperation form section | `CooperationFormSection` | form state/env integrations | A | Sales/admin |
| LF-601 | `/privacy-policy` | Privacy policy | `PrivacyPolicyPage` | JSX | B | Legal/site owner |
| LF-701 | `/home` | Legacy home page | `HomePage` and child sections | JSX + S3 previews | LEGACY_MANAGED | Site owner |

## Admin-Managed Mandatory Features

Mandatory admin-managed features are LF-002, LF-004, LF-101 through LF-103, LF-201 through LF-208, LF-301 through LF-305, LF-402 where certificate/PDF management is required, and LF-502 as lead intake.
