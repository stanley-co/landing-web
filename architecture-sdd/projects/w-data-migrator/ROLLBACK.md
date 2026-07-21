# Rollback

Preferred rollback:

- DB backup restore before import;
- transaction rollback for failed run;
- import batch ID to delete imported rows if needed.

Never delete S3 binaries during rollback.

