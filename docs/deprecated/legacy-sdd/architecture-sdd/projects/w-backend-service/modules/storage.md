# storage Module

Purpose: technical S3/MinIO abstraction.

Scope: put/get/delete objects, signed/public URL generation, bucket health, local MinIO config, checksum.

Services: `StorageService`, `S3StorageService`.

Tests: Testcontainers/MinIO integration, missing bucket, object write/read.

