# Products List

Route: `/catalog/products`. Roles: all read; write actions for `ADMIN`, `FEATURE_OWNER`.

Endpoint: `GET /admin/products`.

Columns: ID, name, category, status, updatedAt, sortOrder. Filters: category, status, search. Actions: view/edit/archive.

Acceptance: server pagination/filter/sort works; existing IDs visible.

