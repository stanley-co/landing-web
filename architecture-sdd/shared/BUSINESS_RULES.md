# Business Rules

- S3 is the current source of input data for migration.
- PostgreSQL becomes source of truth for structured data after migration.
- S3 remains source of truth for binaries.
- Existing public IDs and routes must be preserved.
- `/home` remains available and is marked legacy/deprecated.
- `/news/:id` remains the public material detail route.
- Slug is optional future field, not public identifier in MVP.
- i18n is out of MVP.
- Scheduled publication is out of MVP.
- Status model for managed content is `DRAFT`, `ACTIVE`, `ARCHIVED`.
- Leads must be stored before any notification attempt.
- Email is the only active MVP notification channel.
- Telegram is a disabled stub.
- Bitrix is future adapter only.
- PDF binaries are never stored in PostgreSQL.

