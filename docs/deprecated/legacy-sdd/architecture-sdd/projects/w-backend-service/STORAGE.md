# Storage

S3-compatible object storage for binaries. PostgreSQL metadata.

Backend controls uploads, validates MIME/size/checksum, writes object, stores metadata, prevents deletion of used files.

Generate public URLs or proxy/signed URLs according to file policy.

