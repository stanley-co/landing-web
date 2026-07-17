# Public Frontend Migration Plan

Order:

1. Create OpenAPI generated API client wrapper.
2. Integrate site settings.
3. Replace header/footer menu and contacts.
4. Replace equipment list/categories/slides.
5. Replace product detail and related content.
6. Replace search modal with server search.
7. Replace information page and `/news/:id`.
8. Replace page sections for `/about`, `/contacts`, `/privacy-policy`.
9. Add documents/certificates public display when endpoints exist.
10. Replace lead form with `POST /public/leads`.
11. Migrate legacy `/home` data last and keep route.

Each step must preserve UI, routes and current loading/error behavior or improve it.

