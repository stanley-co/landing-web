# Request Tracing

Every request gets `X-Request-ID`.

If client sends valid request ID, keep it. Otherwise generate UUID. Include request ID in logs and error responses.

Honor proxy headers only from trusted reverse proxy.

