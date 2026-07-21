# auth Module

Purpose: login, refresh, logout, current user.

Scope: credentials validation, token/session issue, refresh revocation, login rate-limit hooks.

Entities/tables: `admin_sessions` or `refresh_tokens`, references `admin_users`.

Services: `AuthService`, `TokenService`, `PasswordService`.

Controllers: `/api/v1/auth/login`, `/refresh`, `/logout`, `/me`.

DTO: `LoginRequest`, `AuthResponse`, `CurrentUserResponse`.

Validation: email/password required, lockout on repeated failure.

Permissions: authenticated user for `/me`; login public but rate-limited.

Errors: `INVALID_CREDENTIALS`, `ACCOUNT_LOCKED`, `TOKEN_EXPIRED`.

Audit: login success/failure, logout, refresh revoke.

Tests: login, bad password, refresh rotation, logout idempotency.

Order: after foundation, before admin modules.

