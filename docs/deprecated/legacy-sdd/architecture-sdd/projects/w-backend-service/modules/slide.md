# slide Module

Purpose: hero/carousel slides.

Entities/tables: `slides`.

Scope: page code, image, title, description, button text/link, order, status.

Controllers: `/public/slides`, `/admin/slides`.

Validation: active slide needs media/title; link type allowed.

Tests: active ordering, link validation.

## Code Validation Addendum 2026-07-17

Evidence:

- `src/components/EquipmentCarousel/EquipmentCarousel.tsx` loads `S3_URLS.CAROUSEL`.
- Current slide schema is `id`, `image`, `title`, `description`, optional `link`, optional `buttonText`.
- Current order is array order; current code has no separate `visible`, `actionType`, adaptive image or autoplay fields.
- Link `#contact-form` opens the contact modal; external URLs open a new tab; hash links scroll/navigate.

Required target behavior:

- Public slide DTO must remain current-compatible: `id`, `image`, `title`, `description`, `link`, `buttonText`.
- Backend may add `status`, `pageCode`, and `sortOrder`, but these must not force a frontend rewrite.
- Admin slide form must be a first-class screen with image picker, title, description, button text, link, status, order and preview. Do not use raw JSON editor as the primary UI.

Acceptance:

- The three current S3 slides import and render in the same order.
- An active slide with `link="#contact-form"` opens the modal after migration.
