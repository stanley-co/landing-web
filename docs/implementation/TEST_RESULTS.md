# Test Results

- Baseline `npm run build` result is recorded in `architecture-sdd/validation/LANDING_CODE_AUDIT.md`.
- No production-code checks were rerun during repository preparation.
# Test Results

| Command | Result |
|---|---|
| `npm run generate:api` | PASS: public TypeScript schema regenerated from `w-api-contracts/openapi/openapi.yaml`. |
| `npm run build` | PASS: TypeScript and Vite production build completed after removing three unused S3 helper imports. |

Known non-blocking output: Vite reports the Yandex Metrika `noscript` element
inside `head` and a JavaScript chunk over 500 kB. Neither warning fails the
build; route-level code splitting and HTML cleanup are follow-up tasks.
