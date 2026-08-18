# media Module

Purpose: image/media metadata and safe use.

Scope: images, thumbnails, WebP, original file, MIME validation, checksum, size, S3 key, usage, orphan detection, safe delete.

Entities/tables: `media_files`, usage relation tables.

Controllers: `/admin/media`, `/admin/media/upload`, `/admin/media/{id}/usage`.

Permissions: upload/write `ADMIN`/`FEATURE_OWNER`; read all admin roles.

Tests: MIME/size, duplicate checksum optional, safe delete blocked when used.

