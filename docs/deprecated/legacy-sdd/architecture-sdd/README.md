# Architecture SDD Package

Этот каталог содержит переносимую SDD-документацию для системы вокруг существующего публичного frontend `landing-web`.

Правило использования: для нового репозитория переносится папка конкретного проекта из `projects/*` вместе с нужными файлами из `shared/`, `adr/` и ссылкой на `MASTER_ARCHITECTURE.md`. Каждый проектный пакет самодостаточен для отдельного AI-агента.

Source of truth:

- архитектурные решения: `adr/`;
- общие правила: `shared/`;
- границы проектов: `PROJECT_MAP.md`;
- API-контракты: `projects/w-api-contracts/`;
- roadmap и приемка: `delivery/`.

Порядок чтения для агента:

1. `README.md`;
2. `MASTER_ARCHITECTURE.md`;
3. нужный `projects/<project>/README.md`;
4. `projects/<project>/AGENT_INSTRUCTIONS.md`;
5. связанные ADR и shared-файлы.

| Проект | Папка SDD | Куда переносить | Назначение |
| --- | --- | --- | --- |
| `landing-web` | `projects/landing-web` | существующий frontend repo | постепенная интеграция публичного сайта с API |
| `w-api-gateway` | `projects/w-api-gateway` | отдельный repo только при future extraction | edge/gateway правила; в MVP реализуется в backend |
| `w-backend-service` | `projects/w-backend-service` | backend repo | Java 21 Spring Boot modular monolith |
| `w-admin-web` | `projects/w-admin-web` | admin frontend repo | React/Vite админ-панель |
| `w-api-contracts` | `projects/w-api-contracts` | API contracts repo/package | OpenAPI, DTO, error model, generation |
| `w-data-migrator` | `projects/w-data-migrator` | migrator repo/module | перенос S3 JSON и metadata в PostgreSQL |
| `w-platform-infra` | `projects/w-platform-infra` | infra repo | Docker Compose, local/VPS baseline |

Изменение документации: любое изменение архитектурного решения должно сопровождаться ADR или изменением существующего ADR. Проектные SDD не должны противоречить `shared/` и `adr/`.

