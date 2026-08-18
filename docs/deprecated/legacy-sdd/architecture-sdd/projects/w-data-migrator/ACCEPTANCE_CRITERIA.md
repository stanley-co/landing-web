# Acceptance Criteria

- Dry-run completes without DB writes.
- Import is idempotent.
- Existing IDs and order preserved.
- Broken references reported.
- PostgreSQL contains imported structured data.
- No S3 binaries are deleted.

