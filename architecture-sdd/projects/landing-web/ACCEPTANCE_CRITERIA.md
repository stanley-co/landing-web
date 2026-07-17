# Acceptance Criteria

- Existing public routes still work.
- `/home` still works and displays legacy content.
- `/news/:id` still resolves by existing ID.
- No direct S3 JSON fetch remains after migration.
- No Telegram/Bitrix frontend requests remain.
- Lead form stores lead through backend and shows validation errors.
- Tests cover critical routes.

