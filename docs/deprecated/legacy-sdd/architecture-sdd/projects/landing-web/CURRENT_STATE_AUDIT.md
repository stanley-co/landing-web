# Current State Audit

| File | Component | Route | Current data | S3 | Hardcode | External integration | Future endpoint |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `src/App.tsx` | Routes | all | route tree | no | yes | no | preserve routes |
| `src/routes/EquipmentPage.tsx` | EquipmentPage | `/`, `/equipment` | products, category mapping/order | products JSON | category order, loading text | no | `/public/products`, `/public/product-categories`, `/public/slides` |
| `src/components/EquipmentCarousel/EquipmentCarousel.tsx` | EquipmentCarousel | `/equipment` | slides | carousel JSON | loading text | external link handling | `/public/slides?page=equipment` |
| `src/components/Header/Header.tsx` | Header | all | menu, anchors | no | menu arrays, CTA | search modal | `/public/menu/header`, `/public/product-categories` |
| `src/components/SearchModal/SearchModal.tsx` | SearchModal | all | all products client search | products JSON | UI text | no | `/public/products?search=&size=10` |
| `src/routes/ProductDetailPage.tsx` | ProductDetailPage | `/equipment/:id` | product by array find, related articles | products/articles JSON | loading/error texts | Rutube via ProductVideo | `/public/products/{id}` |
| `src/components/ProductVideo/ProductVideo.tsx` | ProductVideo | product | Rutube URL | no | iframe title | Rutube iframe | product DTO `video` |
| `src/routes/InformationPage.tsx` | InformationPage | `/information` | news/articles arrays | news/articles JSON | filters, tabs, texts | no | `/public/content`, `/public/news/{id}` |
| `src/routes/NewsArticlePage.tsx` | NewsArticlePage | `/news/:id` | news+articles merged by ID | news/articles JSON | errors | share links | `/public/news/{id}` |
| `src/routes/NewsPage.tsx` | NewsPage | currently redirected `/news` | news list | news JSON | breadcrumb text | no | not public route unless restored |
| `src/routes/AboutPage.tsx` | AboutPage | `/about` | company text/sections | image via S3 | mission/competences/disabled clients | no | `/public/pages/about` |
| `src/components/CompanyIntro/CompanyIntro.tsx` | CompanyIntro | `/about` | intro text, badges | one image path | content | no | page sections |
| `src/routes/ContactsPage.tsx` | ContactsPage | `/contacts` | contacts + form | no | page composition | form | `/public/contacts`, `/public/leads` |
| `src/components/ContactInfo/ContactInfo.tsx` | ContactInfo | `/contacts` | address, phone, emails, Rutube | no | contacts | Rutube/Wikimedia | `/public/contacts` |
| `src/components/Footer/Footer.tsx` | Footer | all | quick links, contacts, legal text | no | footer content | Rutube/Wikimedia | `/public/site`, `/public/menu/footer` |
| `src/components/CooperationForm/CooperationForm.tsx` | CooperationForm | contacts/modal | form state | no | validation/messages | Telegram/Bitrix direct fetch | `POST /public/leads` |
| `src/config/bitrix.ts` | Bitrix config | form | env webhook flags | no | fallback webhook | Bitrix | remove from frontend after migration |
| `src/routes/PrivacyPolicyPage.tsx` | PrivacyPolicyPage | `/privacy-policy` | legal document | no | full legal text | mailto/tel | `/public/pages/privacy-policy` or `/public/documents/legal/privacy-policy` |
| `src/routes/HomePage.tsx` | HomePage | `/home` | legacy blocks | mixed | legacy components arrays | no | `/public/pages/home`, `/public/legacy` |
| `index.html` | head | all | meta, Yandex Metrika | no | counter id | Yandex Metrika | `/public/site` settings for future |

No tests were found.

