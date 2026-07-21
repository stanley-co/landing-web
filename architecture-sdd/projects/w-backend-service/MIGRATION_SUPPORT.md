# Migration Support

Backend must expose stable persistence model for `w-data-migrator`. It may provide internal import services or repository-level APIs, but migrator must remain idempotent.

Imported rows keep legacy external IDs and S3 paths.

