# Routing

Required route prefixes:

- `/api/v1/public/**` -> public controllers, no auth, rate limits where needed.
- `/api/v1/auth/**` -> authentication controllers.
- `/api/v1/admin/**` -> authenticated admin controllers with RBAC.
- `/actuator/health` -> health endpoint.

Unknown API route returns standard `404` error model.

## Code Validation Addendum 2026-07-17

MVP route mapping:

| Prefix | Target | Notes |
| --- | --- | --- |
| `/api/v1/public/products/**` | catalog public controllers | no auth; rate limit search if needed |
| `/api/v1/public/product-categories` | catalog public controllers | no auth |
| `/api/v1/public/content` | content public controllers | no auth |
| `/api/v1/public/news/{id}` | content public controllers | `{id}` is existing content ID |
| `/api/v1/public/slides` | slide public controllers | no auth |
| `/api/v1/public/leads` | lead public controller | no auth; rate limit and request size limits |
| `/api/v1/admin/**` | admin controllers | auth + RBAC |

No gateway route performs business DTO reshaping.
