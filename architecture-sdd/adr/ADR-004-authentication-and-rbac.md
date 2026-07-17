# ADR-004 Authentication And RBAC

Status: Accepted.

Decision:

- Spring Security protects backend.
- Admin authentication uses access/refresh session model; httpOnly secure cookies are preferred for admin frontend.
- CSRF protection is required for cookie-based write operations.
- CORS uses explicit allowlist.
- Roles are exactly `ADMIN`, `FEATURE_OWNER`, `CONTENT_READER` for MVP.
- Permissions remain module/action-based internally.

All admin writes must be audited. Public lead endpoint is rate-limited and anti-spam checked.

