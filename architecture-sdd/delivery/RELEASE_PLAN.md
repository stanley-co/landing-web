# Release Plan

MVP release sequence:

1. local environment;
2. backend foundation with auth;
3. catalog/content APIs;
4. migrator dry-run and staging import;
5. admin content management;
6. public frontend API integration;
7. lead email flow;
8. full smoke;
9. VPS baseline.

Rollback: DB backup restore, frontend static rollback, backend previous image.

