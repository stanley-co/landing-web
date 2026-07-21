# Approved MVP Scope Decisions — 2026-07-18

This document is the authoritative resolution of the former scope questions. It supersedes earlier requirements that conflict with it.

## Managed and static pages

- `/about` and `/contacts` remain static landing-web code. Contacts, menus, CTAs and anchors have no admin CRUD in MVP.
- Only `/privacy-policy` is managed. It uses a fixed `PrivacyPolicy`/`LegalDocument(PRIVACY_POLICY)` model with Markdown as the canonical text format, `DRAFT|ACTIVE|ARCHIVED`, title, text, effective/updated dates, SEO title/description, OG image and audit fields. There is exactly one ACTIVE version.
- A generic page builder, `PageSection` CRUD and SEO administration for static pages are out of scope.

## Carousel and media

- The single equipment catalog carousel has placement `EQUIPMENT_CATALOG`; it is rendered wherever the catalog component is rendered.
- A slide has required desktop and mobile images, `sortOrder`, `active`, optional text and the actions `INTERNAL_LINK`, `EXTERNAL_LINK`, `ANCHOR`, `OPEN_FORM`. There is no scheduled publication.
- Backend configuration enforces the active-slide limit (`app.carousel.max-active-slides`, local default 10).
- Media accepts JPEG, PNG, WebP and PDF. Metadata (`title`, `alt`, `description`, safe original filename and status) is editable without changing `mediaId`; file replacement preserves `mediaId` and switches storage atomically after validation.
- Certificates and uploaded video are future scope. Documents are managed PDF metadata and binary files only; product video remains a validated allowed-domain URL.

## Leads and notifications

- Public lead types are `PRODUCT_REQUEST` and `FEEDBACK`. Required fields are company name, first name, phone, email, consent, form type and source. `PRODUCT_REQUEST` additionally requires `productId`; comment is optional.
- Leads have no CRM business status. Notification delivery has only `PENDING|SENT|FAILED`; the admin is read-only for leads and delivery history (no manual retry).
- The sole MVP notification channel is email, configured as a recipient list through `app.notifications.lead-recipients` (initial local value `dds_stalker@mail.ru`). SMTP secrets are never committed. Telegram and Bitrix browser integrations are removed after the lead API is integrated.

## Removed and deferred scope

- `/home`, `LegacyBlock`, legacy API/UI/tests/migration and compatibility requirements are removed from MVP.
- Certificate API/UI/domain, contacts/menu administration, a universal page builder, lead retry and Telegram/Bitrix adapters are future scope.
- `w-data-migrator` is **DEFERRED**: retain ID preservation, idempotency, dry-run and mapping skeletons, but do not scan/import production S3 or write production PostgreSQL/S3. Use Flyway and local fixtures instead.
- Full public acceptance, production domains/CORS/SMTP/secrets/backups/release ownership and production deployment are **DEFERRED UNTIL PUBLIC FRONTEND INTEGRATION** or **DEFERRED UNTIL DEPLOYMENT PHASE** as applicable.

## MVP role matrix

`ADMIN`, `FEATURE_OWNER` and `CONTENT_READER` may view slides, products, content, privacy policy, media and leads. The first two may edit slides/products/content/privacy/media; only `ADMIN` manages users and system settings. `CONTENT_READER` has no mutations and no full audit access; `FEATURE_OWNER` has limited audit visibility.
