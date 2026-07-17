# setting Module

Purpose: public and admin settings.

Scope: site settings, analytics ID, logo refs, email notification recipient/sender, feature flags without secrets exposure.

Entities/tables: `settings`.

Permissions: public settings write `ADMIN`/`FEATURE_OWNER`; secrets/security `ADMIN` only.

Tests: masked secret output, public DTO excludes sensitive values.

