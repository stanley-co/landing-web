# Component Map

Critical components to migrate:

- `Header`: menu and categories from API.
- `Footer`: settings, footer menu, contacts from API.
- `EquipmentCarousel`: slides from API.
- `EquipmentPage`: categories/products from API.
- `SearchModal`: server search.
- `ProductDetailPage`: product detail by existing ID.
- `InformationPage`: server content list with filters.
- `NewsArticlePage`: material by existing ID.
- `AboutPage`, `ContactsPage`, `PrivacyPolicyPage`, `HomePage`: page/section APIs.
- `CooperationForm`: `POST /public/leads`.

Reusable visual components should remain; replace data acquisition, not layout.

