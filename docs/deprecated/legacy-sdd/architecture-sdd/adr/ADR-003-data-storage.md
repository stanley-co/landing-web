# ADR-003 Data Storage

Status: Accepted.

Decision:

- PostgreSQL stores structured data after migration.
- S3-compatible storage stores binaries: images, PDF, certificates, documents.
- Current S3 is source of initial migration data.
- Local MinIO is used for development/tests.

PostgreSQL stores metadata for files: bucket, storage key, public URL or policy, MIME type, size, checksum, original name, uploader, status and entity links.

PDF files must not be stored as byte arrays in PostgreSQL.

