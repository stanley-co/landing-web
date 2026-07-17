# document Module

Purpose: PDF and managed documents.

Scope: PDF upload, preview, download, replacement, archive, visibility, type, description, relation to page/product/company section.

Entities/tables: `documents`, uses `media_files`.

Controllers: `/public/documents`, `/admin/documents`.

Validation: PDF MIME, max 25 MB, active document has file/title/type.

Tests: upload metadata, replace file, archive, safe delete.

