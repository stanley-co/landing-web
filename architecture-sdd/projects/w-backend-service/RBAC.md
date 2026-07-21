# RBAC

Roles: `ADMIN`, `FEATURE_OWNER`, `CONTENT_READER`.

Use permissions internally, mapped to roles at bootstrap. See `shared/SYSTEM_ROLES.md`.

Controllers use method security annotations or centralized authorization service. Do not hardcode role checks deep in repositories.

