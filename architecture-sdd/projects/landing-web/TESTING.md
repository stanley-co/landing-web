# Testing

Add:

- API client tests with mocked fetch;
- component tests for loading/error/empty states;
- E2E smoke for `/equipment`, `/equipment/:id`, `/information`, `/news/:id`, `/contacts`, `/home`;
- lead form submission test;
- visual regression screenshots if tooling is available.

## Code Validation Addendum 2026-07-17

Audit command results:

- `npm install`: success; npm reported 21 vulnerabilities: 8 moderate, 8 high, 5 critical.
- `npm run build`: failed at `tsc` due unused imports:
  - `src/components/ContactForm/ContactForm.tsx`: unused `getS3FileUrl`;
  - `src/components/CooperationForm/CooperationForm.tsx`: unused `getS3FileUrl`;
  - `src/components/NewsSubscribeCTA/NewsSubscribeCTA.tsx`: unused `getS3FileUrl`.

Before landing API migration begins, create a separate production-code cleanup task to make `tsc && vite build` pass.
