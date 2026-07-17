# menu Module

Purpose: header/footer navigation.

Entities/tables: `menus`, `menu_items`.

Scope: hierarchy, anchors, internal/external URLs, ordering, visibility.

Controllers: `/public/menu/{code}`, `/admin/menus`.

Validation: menu code unique, URL/route format valid.

Permissions: write `ADMIN`/`FEATURE_OWNER`.

Tests: tree building, order, hidden items excluded public.

