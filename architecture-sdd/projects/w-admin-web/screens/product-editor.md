# Product Editor

Routes: `/catalog/products/new`, `/catalog/products/:id`.

Fields: existing ID, name, category, descriptions, specs, advantages, media, video, related content, status.

Validation: ID immutable after create/import; active requires category/name/description/main media.

Acceptance: create/update/archive product; media picker works; related content by existing ID.

## Code Validation Addendum 2026-07-17

The editor must cover every field used by the current landing, not only name/description/image:

| Current field | Form control |
| --- | --- |
| `id` | immutable external ID input after import/create |
| `name` | text input |
| `globalCategory` + `category` | category tree selector with parent/child grouping |
| `image` | required main image media picker for ACTIVE |
| `galleryImages[]` | ordered gallery picker with preview/reorder |
| `description` | short description textarea |
| `fullDescription` | full description textarea |
| `specs` | repeatable arbitrary key/value rows; no fixed enum |
| `advantages[]` | repeatable icon/title/description rows |
| `materialsAndNews.video` | Rutube/permitted URL field |
| `materialsAndNews.articles` | related content picker by existing content ID |
| legacy `atricles` | import warning only; normalized to `articles` |
| status/sort order | select/order controls |

Acceptance: a product imported from current S3 can be opened, saved without losing fields, and returned through public detail DTO with gallery, specs, advantages, video and related articles intact.
