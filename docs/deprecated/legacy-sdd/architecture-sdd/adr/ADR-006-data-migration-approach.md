# ADR-006 Data Migration Approach

Status: Accepted.

Decision: implement `w-data-migrator` as a Spring Boot command-line application or module that can run against S3 and PostgreSQL with dry-run and import modes.

Rationale:

- Java stack reuse;
- can share DTO/mapping concepts with backend without coupling runtime;
- supports Testcontainers and transactional import tests.

Rules:

- current S3 is source of truth;
- local JSON only comparison;
- preserve existing IDs, paths and order;
- idempotent by legacy ID/external ID;
- dry-run mandatory;
- report broken references;
- rollback via database backup/transaction strategy.

