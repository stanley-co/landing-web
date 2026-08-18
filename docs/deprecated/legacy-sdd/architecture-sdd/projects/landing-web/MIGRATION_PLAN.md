# Public Frontend Migration Plan

Order:

1. Create OpenAPI generated API client wrapper.
2. Integrate site settings.
3. Keep header/footer menu and contacts static in code.
4. Replace equipment list/categories/slides.
5. Replace product detail and related content.
6. Replace search modal with server search.
7. Replace information page and `/news/:id`.
8. Replace only `/privacy-policy` with the fixed legal endpoint; keep `/about` and `/contacts` static.
9. Add documents public display when endpoint exists; certificates are future scope.
10. Replace lead form with `POST /public/leads`.

Production S3 scan/import and the complete fallback audit are **DEFERRED UNTIL PUBLIC FRONTEND INTEGRATION**.
11. Migrate legacy `/home` data last and keep route.

Each step must preserve UI, routes and current loading/error behavior or improve it.
