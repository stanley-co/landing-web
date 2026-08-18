# lead Module

Purpose: user lead form.

Scope: validation, consent, product relation, source, status, anti-spam, rate limit cooperation with edge, admin list, filters, event history.

Entities/tables: `leads`.

Controllers: `POST /public/leads`, `/admin/leads`.

Validation: consent true, phone or email required, message size limits, product ID optional but must exist if supplied.

Events: `LeadCreatedEvent` for notification.

Tests: valid lead, no consent, spam/rate path, admin filters.

## Code Validation Addendum 2026-07-17

Evidence:

- `src/components/CooperationForm/CooperationForm.tsx` collects `company`, `name`, `secondName`, `lastName`, `phone`, `email`, `comment`, consent and optional product name context.
- The product modal passes product name through `ContactFormModal` from `ProductGallery`.
- Current browser delivery can call Telegram or Bitrix webhook depending on env, but approved MVP replaces this with backend persistence + email; Telegram remains stub and Bitrix is out of MVP.
- `src/components/ContactForm/ContactForm.tsx` is alert-only and not mounted by current `ContactsPage`; do not let this unused legacy form drive the MVP API.

Required target behavior:

- Public lead create accepts `source`, `formType`, optional `productId`/`productName`, contact fields, comment and `consentAccepted`.
- Persist every accepted lead in PostgreSQL before notification.
- Send email notification through backend notification module.
- Keep Telegram as disabled/stub path only; do not implement Bitrix in MVP.
- Admin lead detail shows source/form type/product context/raw delivery result only where useful for diagnostics.

Acceptance:

- A lead submitted from product detail stores product context and can be read in admin.
- A lead without phone and email is rejected with field-level validation.
