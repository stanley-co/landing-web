# user Module

Purpose: admin user management.

Scope: create/update/block admins, password reset/bootstrap.

Entities/tables: `admin_users`, relation to `roles`.

Services: `AdminUserService`.

Controllers: `/api/v1/admin/users`.

Permissions: `ADMIN` only for writes; readers no access.

Validation: unique email, strong password, no self-lock without another ADMIN.

Audit: all changes.

Tests: CRUD, role assignment, blocked login.

