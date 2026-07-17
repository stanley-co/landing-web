# Project Context

`landing-web` is the current Vite React/Ionic public site. It remains the public web UI and must not be rebuilt from scratch.

Runtime responsibilities:

- equipment catalog;
- product detail;
- news/articles list and detail;
- company pages;
- contacts;
- lead forms;
- legacy `/home`;
- documents/certificates display after API is available.

Dependencies after migration:

- `w-api-contracts` generated TypeScript client;
- `w-backend-service` public API;
- public media URLs from backend DTOs.

