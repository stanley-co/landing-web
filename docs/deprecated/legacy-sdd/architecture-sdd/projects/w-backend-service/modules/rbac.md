# rbac Module

Purpose: roles and permissions.

Scope: seed three roles, expose read model, enforce permission mapping.

Entities/tables: `roles`, `permissions`, join tables.

Permissions: role modification `ADMIN` only. MVP roles fixed; UI should not create extra roles.

Tests: matrix from `shared/SYSTEM_ROLES.md`.

