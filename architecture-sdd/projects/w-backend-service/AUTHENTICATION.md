# Authentication

Use Spring Security.

Preferred admin auth:

- short access token;
- refresh token in httpOnly secure cookie;
- CSRF for cookie-based writes;
- server-side refresh token hash and revocation.

Password reset can be added after MVP foundation if required.

