# legacy Module

Purpose: preserve deprecated `/home` blocks.

Scope: legacy blocks, deprecated marker, admin warning, usage tracking, removal criteria, API compatibility, migration.

Entities/tables: `legacy_blocks` with `deprecated=true`, `block_code`, `payload`, `status`, `usage_notes`.

Controllers: `/public/legacy`, `/admin/legacy`.

Admin behavior: show `Deprecated` badge and warning. Do not offer legacy block types for new pages.

Removal criteria: analytics confirms no route usage, business approval, redirects/SEO reviewed, tests removed in planned change.

Tests: `/home` still displays, legacy API returns active blocks, deprecated metadata visible admin-side.

