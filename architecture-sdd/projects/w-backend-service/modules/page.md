# page Module

Purpose: public pages and sections.

Scope: `/about`, `/contacts`, `/privacy-policy`, `/home`, sections, ordering, visibility, text, images, SEO.

Entities/tables: `pages`, `page_sections`.

Controllers: `/public/pages/{route}`, `/admin/pages`.

Validation: route unique, visible section has supported type/payload.

Permissions: read all admin roles, write `ADMIN`/`FEATURE_OWNER`.

Tests: route lookup, active sections order, SEO fields.

