# Docker Compose

Services:

```text
postgres:5432
minio:9000/9001
minio-init
mailpit:1025/8025
w-backend-service:8080
landing-web:5173 or nginx static
w-admin-web:5174 or nginx static
```

Use one bridge network and named volumes.

