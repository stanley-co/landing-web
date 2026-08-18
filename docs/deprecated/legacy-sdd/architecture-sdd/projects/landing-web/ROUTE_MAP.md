# Route Map

| Route | Must keep | Current page | Future API |
| --- | --- | --- | --- |
| `/` | yes | `EquipmentPage` | products/categories/slides |
| `/equipment` | yes | `EquipmentPage` | products/categories/slides |
| `/equipment/:id` | yes | `ProductDetailPage` | `GET /api/v1/public/products/{id}` |
| `/information` | yes | `InformationPage` | `GET /api/v1/public/content` |
| `/news` | yes, redirect | `Navigate` to `/information#news` | no API required |
| `/news/:id` | yes | `NewsArticlePage` | `GET /api/v1/public/news/{id}` |
| `/about` | yes, static | `AboutPage` | none in MVP |
| `/contacts` | yes, static | `ContactsPage` | leads only |
| `/privacy-policy` | yes, managed | `PrivacyPolicyPage` | `GET /api/v1/public/legal/privacy-policy` |
| `/home` | no, removed MVP scope | — | — |
| `*` | yes | `NotFoundPage` | no API required |

Do not migrate to slug routes in MVP.

## Code Validation Addendum 2026-07-17

Facts from `src/App.tsx`:

- `/` and `/equipment` both render `EquipmentPage`.
- `/news` is a legacy redirect to `/information#news`; keep this behavior.
- `/news/:id` renders both news and articles by existing ID; do not replace with slug.
- `/home` is a legacy page and must remain accessible.
