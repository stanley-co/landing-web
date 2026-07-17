# Slides

Route: `/slides`.

Fields: pageCode, title, description, image, button text, link, sort order, status.

Acceptance: active slide order matches public carousel.

## Code Validation Addendum 2026-07-17

Current landing slide fields are `id`, `image`, `title`, `description`, `link`, `buttonText`. Admin may store `status`, `pageCode`, and `sortOrder`, but public DTO must stay compatible with `EquipmentCarousel`.

Link validation must understand current behavior:

- `#contact-form` opens the lead modal;
- `http://` and `https://` are external links;
- `#anchor` and `/path#anchor` are hash navigation;
- `/path` is internal navigation.

No raw JSON editor as the primary slide UI.
