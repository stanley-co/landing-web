# Database Model

Primary tables:

- `admin_users`, `roles`, `permissions`, `admin_user_roles`, `role_permissions`;
- `audit_logs`;
- `product_categories`, `products`, `product_specs`, `product_advantages`, `product_media`, `product_videos`, `product_related_content`;
- `content_items`, `content_blocks`;
- `pages`, `page_sections`, `legacy_blocks`;
- `menus`, `menu_items`, `slides`, `contacts`, `social_links`, `settings`;
- `media_files`, `documents`, `certificates`;
- `leads`, `notification_events`.

Identifiers:

- internal primary key: UUID;
- existing public ID: `external_id` or natural `id_value`, unique and immutable;
- optional `slug` nullable for future.

All mutable aggregate roots include timestamps, status and audit user references where relevant.

## Code Validation Addendum 2026-07-17

Minimum columns/relations required by current landing:

- `products.external_id` unique immutable; `name`, `short_description`, `full_description`, `status`, `sort_order`, `global_category_id`, `category_id`.
- `product_specs`: `product_id`, `sort_order`, `name`, `value`; arbitrary names are valid.
- `product_advantages`: `product_id`, `sort_order`, `icon`, `title`, `description`.
- `product_media`: `product_id`, `media_file_id`, `role` (`MAIN`, `GALLERY`), `sort_order`.
- `product_videos`: `product_id`, `url`, `provider`.
- `product_related_content`: `product_id`, `content_item_id`, `sort_order`, `relation_type`.
- `product_categories`: self-referencing parent, exact display name, `sort_order`, status.
- `slides`: `external_id`, `page_code`, `title`, `description`, `media_file_id`, `button_text`, `link`, `sort_order`, `status`.
- `content_items`: `external_id`, `type`, `title`, `date`, required display/filter `category` string, `cover_media_file_id`, `preview`, `status`; no separate category table or slug column is justified by the current MVP JSON/routes.
- `content_blocks`: `content_item_id`, `sort_order`, `type`, typed text/url/media fields or constrained JSON payload.
- `leads`: source/form type, company, first/second/last name, phone, email, comment, consent flag/time, optional product reference/name, status.

Avoid using generic `page_sections.payload` for catalog, carousel, content blocks, certificates, documents or leads. Those have stable subject structures.
