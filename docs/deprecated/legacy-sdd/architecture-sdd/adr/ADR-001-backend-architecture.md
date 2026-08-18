# ADR-001 Backend Architecture

Status: Accepted.

Decision: implement `w-backend-service` as a Java 21 Spring Boot 3.x modular monolith.

Alternatives considered:

- Microservices: rejected for MVP.
- Modular monolith: accepted.

Rationale:

- one data domain with tight relations between catalog, content, files, leads and admin actions;
- small project and likely small team;
- one VPS production target;
- easier transactions, CI/CD, local development and tests;
- no clear independent scaling needs.

Consequences:

- modules must have clear boundaries and package structure;
- no generic CRUD-only package;
- future extraction is possible for notification, media processing, search, lead integrations, audit or migration jobs when load/team/release cycles justify it.

