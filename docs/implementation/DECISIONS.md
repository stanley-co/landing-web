# Decisions

- Preserve current routes, public IDs, legacy `/home`, and `/news/:id` through incremental API migration.
- The root `architecture-sdd` package remains the architecture source of truth.
# Decisions

- The landing client uses generated OpenAPI types and `openapi-fetch` with a
  public base URL. It carries no authentication credentials and does not alter
  the existing S3 data flows until each replacement endpoint is ready.
