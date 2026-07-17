# Health Checks

Expose:

- `/actuator/health` liveness/readiness summary;
- database health;
- S3/minio health;
- SMTP health should be optional/readiness-warning, not hard failure for public browsing.

