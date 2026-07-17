# File Storage Conventions

S3/MinIO keys:

```text
media/{type}/{yyyy}/{uuid}-{safe-file-name.ext}
documents/{yyyy}/{uuid}-{safe-file-name.pdf}
certificates/{yyyy}/{uuid}-{safe-file-name.pdf}
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
- uploader;
- timestamps;
- usage links.

