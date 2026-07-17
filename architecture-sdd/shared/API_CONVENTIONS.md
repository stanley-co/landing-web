# API Conventions

Prefixes:

- `/api/v1/public/**`
- `/api/v1/auth/**`
- `/api/v1/admin/**`

Conventions:

- JSON UTF-8;
- ISO-8601 timestamps;
- existing public IDs are path IDs for products and news;
- pagination: `page`, `size`, `sort`;
- search query: `q` or `search`;
- filters are explicit query params;
- public endpoints return only `ACTIVE` content;
- admin endpoints may return all statuses.

