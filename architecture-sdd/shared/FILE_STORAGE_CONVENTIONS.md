# File Storage Conventions

S3/MinIO keys:

```text
media/{type}/{yyyy}/{uuid}-{safe-file-name.ext}
documents/{yyyy}/{uuid}-{safe-file-name.pdf}
```

Limits for MVP:

- image max 10 MB;
- PDF max 25 MB;
- request body max 30 MB;
- allowed images: JPEG, PNG, WebP;
- PDF: `application/pdf`.

Metadata stored in PostgreSQL:

- bucket;
- storage key;
- public URL/access policy;
- MIME type;
- size;
- checksum;
- original filename;
- width/height for images;
- alt/title;
- status;
- generated `MED-*` code;
- uploader;
- timestamps;
- usage links.

Inline uploads made before their owner exists use a backend-created `media_upload_sessions` row. Such media are `TEMPORARY`, have an expiry of 24 hours, and are activated only inside the transaction that attaches them to a saved owner. A temporary file is never public or a valid attachment to another owner.
