# Authentication

Use Spring Security.

Preferred admin auth:

- short access token;
- refresh token in httpOnly secure cookie;
- CSRF for cookie-based writes;
- server-side refresh token hash and revocation.

The protected `/api/v1/admin/**` API uses the explicit short-lived bearer access
token and does not require a CSRF header. CSRF double-submit remains mandatory
for cookie-backed `/auth/refresh` and `/auth/logout` writes; a bearer token is
never read from ambient browser cookies.

Password reset can be added after MVP foundation if required.
