# Architecture

Spring Boot modular monolith:

- one deployable jar/container;
- separate packages per module;
- module APIs through services/events, not direct cross-module repository access;
- shared `common` only for technical cross-cutting code.

Required dependencies: Spring Web, Data JPA, Security, Validation, Mail, Flyway, OpenAPI, PostgreSQL driver, S3 client, Testcontainers.

