# certificate Module

Purpose: certificate management.

Scope: certificate number, issued date, expires date, PDF relation, visibility, sort order, relation to page/company/product when needed.

Entities/tables: `certificates`, `documents`, `media_files`.

Controllers: `/public/certificates`, `/admin/certificates`.

Validation: expiry after issue date if both present.

Tests: public active only, metadata edit, PDF preview.

