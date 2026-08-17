# Architecture Decision

Decision: internal edge layer inside `w-backend-service`.

Text to preserve:

```text
На этапе MVP отдельный репозиторий и deployable gateway не создаются.
Спецификация описывает edge layer внутри w-backend-service.
```

Reason: one backend service, one VPS, no API aggregation need, lower operational cost.

## Code Validation Addendum 2026-07-17

Gateway scope remains technical only:

- routing;
- CORS;
- request ID;
- rate limiting;
- security headers;
- request/upload size limits;
- auth boundary for admin routes;
- access logging;
- edge error normalization.

It must not store or transform products, categories, slides, articles, leads or migration data. It must not send email and must not act as CMS. Business logic stays in `w-backend-service` modules.
