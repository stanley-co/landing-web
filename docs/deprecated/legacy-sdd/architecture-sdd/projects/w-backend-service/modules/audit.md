# audit Module

Purpose: immutable admin action journal.

Entities/tables: `audit_logs`.

Controllers: `/admin/audit`.

Scope: filter by actor, entity, action, date; limited visibility for non-admin.

Tests: write audit on product/content/user/media/lead changes.

