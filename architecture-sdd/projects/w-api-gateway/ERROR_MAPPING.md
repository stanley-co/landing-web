# Error Mapping

Map all exceptions to shared error model. Never expose stack traces.

Gateway/edge maps:

- auth failures -> 401;
- RBAC failures -> 403;
- missing route -> 404;
- upload too large -> 413;
- unsupported media -> 415;
- rate limit -> 429.

