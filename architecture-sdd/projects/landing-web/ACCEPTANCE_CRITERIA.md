# Acceptance Criteria

- Existing public routes still work.
- `/home` is absent after route, menu, redirect, CI and analytics/reference verification.
- `/news/:id` still resolves by existing ID.
- No direct S3 JSON fetch remains after migration.
- No Telegram/Bitrix frontend requests remain.
- Lead form stores lead through backend and shows validation errors.
- Tests cover critical routes.

Full cross-browser/public-release acceptance is **DEFERRED UNTIL PUBLIC FRONTEND INTEGRATION**.
