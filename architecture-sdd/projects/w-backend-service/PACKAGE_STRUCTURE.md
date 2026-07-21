# Package Structure

Recommended:

```text
ru.fkit.web
  common
  edge
  auth
    api
    application
    domain
    persistence
  catalog
    api
    application
    domain
    persistence
  ...
```

Each module uses:

- `api`: controllers, DTO, mappers;
- `application`: use cases/services;
- `domain`: entities/value objects/domain services;
- `persistence`: repositories/specifications.

