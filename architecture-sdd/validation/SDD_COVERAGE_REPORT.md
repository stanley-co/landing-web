# SDD Coverage Report

| Project | Covered | Partial | Missing | Incorrect | Overdesigned | Readiness |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| landing-web | 18 | 2 | 0 | 0 | 0 | 82% |
| w-api-contracts | 14 | 3 | 0 | 0 | 0 | 86% |
| w-api-gateway | 8 | 0 | 0 | 0 | 0 | 90% |
| w-backend-service | 16 | 2 | 0 | 0 | 0 | 87% |
| w-admin-web | 15 | 3 | 0 | 0 | 0 | 84% |
| w-data-migrator | 13 | 2 | 0 | 0 | 0 | 85% |
| w-platform-infra | 8 | 1 | 0 | 0 | 0 | 82% |

## Readiness Method

Scores follow the requested weighted method:

- 20% feature coverage;
- 20% data model;
- 15% API;
- 15% admin scenarios;
- 10% migration;
- 10% security/RBAC;
- 10% tests/acceptance criteria.

No project is marked 100% because implementation has not started and current landing build fails.

## Remaining Partial Areas

- Category order implementation must import current S3 categories and not rely only on old hardcoded subcategory lists.
- Documents/certificates need a real production S3 binary scan before migration can be considered complete.
- landing-web build requires a separate production-code cleanup task for unused imports.
