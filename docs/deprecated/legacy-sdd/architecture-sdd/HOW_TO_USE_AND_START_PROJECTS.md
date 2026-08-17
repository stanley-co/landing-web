# Как работать с SDD-пакетами и запускать проекты

Этот документ описывает практический порядок работы с `architecture-sdd`: какие проекты создавать, что переносить, в каком порядке подключать AI-агентов и какие команды использовать на следующих этапах.

## 1. Общая логика

Не нужно писать код во всех проектах сразу. Сначала разложить работу по будущим проектам, затем запускать реализацию по очереди:

1. `w-api-contracts`
2. `w-platform-infra`
3. `w-backend-service`
4. `w-data-migrator`
5. `w-admin-web`
6. `landing-web`
7. `w-api-gateway` только если позже понадобится отдельный gateway

Почему такой порядок:

- без API-контрактов frontend и backend начнут расходиться;
- без локальной инфраструктуры backend и мигратор сложно тестировать;
- без backend нечего подключать к админке и публичному сайту;
- мигратор нужен после появления схемы БД;
- публичный frontend лучше менять последним, когда API уже стабилен.

## 2. Что уже есть

Основной пакет документации:

```text
landing-web/architecture-sdd/
```

Это не production-код, а переносимые SDD/ADR/roadmap-документы для нескольких будущих проектов.

Внутри:

```text
architecture-sdd/
├── README.md
├── MASTER_ARCHITECTURE.md
├── PROJECT_MAP.md
├── REQUIREMENTS_TRACEABILITY.md
├── adr/
├── shared/
├── projects/
│   ├── landing-web/
│   ├── w-api-gateway/
│   ├── w-backend-service/
│   ├── w-admin-web/
│   ├── w-api-contracts/
│   ├── w-data-migrator/
│   └── w-platform-infra/
└── delivery/
```

## 3. Как переносить SDD в новый проект

Для каждого нового проекта нужно переносить:

- его папку из `architecture-sdd/projects/<project>`;
- `architecture-sdd/shared`;
- `architecture-sdd/adr`;
- `architecture-sdd/MASTER_ARCHITECTURE.md`;
- `architecture-sdd/PROJECT_MAP.md`;
- `architecture-sdd/DECISIONS.md`;
- `architecture-sdd/REQUIREMENTS_TRACEABILITY.md`.

Пример для `w-api-contracts`:

```bash
mkdir -p /home/dds/dev/stanley-co/w-api-contracts
cp -R /home/dds/dev/stanley-co/web/landing-web/architecture-sdd /home/dds/dev/stanley-co/w-api-contracts/
```

Можно переносить весь `architecture-sdd` целиком. Это проще и безопаснее на старте.

## 4. Как давать задачу AI-агенту

### Шаблон для любого агента

```text
Ты работаешь над проектом <PROJECT_NAME>.

Сначала прочитай:
1. architecture-sdd/projects/<PROJECT_NAME>/README.md
2. architecture-sdd/projects/<PROJECT_NAME>/AGENT_INSTRUCTIONS.md
3. architecture-sdd/MASTER_ARCHITECTURE.md
4. architecture-sdd/DECISIONS.md
5. релевантные файлы из architecture-sdd/shared/
6. релевантные ADR из architecture-sdd/adr/

Затем выполни задачу <TASK_ID> из delivery/IMPLEMENTATION_ROADMAP.md.

Не меняй архитектурные решения без ADR.
В конце дай:
- список измененных файлов;
- реализованные требования;
- тесты;
- миграции;
- API changes;
- known limitations;
- unresolved issues;
- next recommended task.
```

### Пример для `w-api-contracts`

```text
Ты работаешь над проектом w-api-contracts.

Сначала прочитай:
1. architecture-sdd/projects/w-api-contracts/README.md
2. architecture-sdd/projects/w-api-contracts/AGENT_INSTRUCTIONS.md
3. architecture-sdd/MASTER_ARCHITECTURE.md
4. architecture-sdd/shared/API_CONVENTIONS.md
5. architecture-sdd/shared/ERROR_MODEL.md
6. architecture-sdd/adr/ADR-005-api-contract-source.md

Затем выполни CONTRACT-PUBLIC-001 и CONTRACT-AUTH-001.
Доведи openapi.yaml до валидного состояния.
Добавь команды проверки OpenAPI.
```

### Пример для `w-backend-service`

```text
Ты работаешь над w-backend-service.

Прочитай:
- architecture-sdd/projects/w-backend-service/README.md
- architecture-sdd/projects/w-backend-service/AGENT_INSTRUCTIONS.md
- architecture-sdd/projects/w-backend-service/ARCHITECTURE.md
- architecture-sdd/projects/w-backend-service/MODULE_BOUNDARIES.md
- architecture-sdd/shared/SYSTEM_ROLES.md
- architecture-sdd/shared/ERROR_MODEL.md
- architecture-sdd/adr/ADR-001-backend-architecture.md
- architecture-sdd/adr/ADR-002-api-gateway.md

Начни с BACKEND-FOUNDATION-001.
Стек строго Java 21 + Spring Boot 3.x + PostgreSQL + Flyway.
Не создавай микросервисы.
```

## 5. Как использовать скиллы

На текущем этапе специальные Codex skills создавать не обязательно. SDD-пакеты уже выполняют роль проектных инструкций.

Используй “скилл” как специализацию агента:

| Агент | Что читает | Первая задача |
| --- | --- | --- |
| API contracts agent | `projects/w-api-contracts` | `CONTRACT-PUBLIC-001`, `CONTRACT-AUTH-001` |
| Infra agent | `projects/w-platform-infra` | `INFRA-LOCAL-001` |
| Backend agent | `projects/w-backend-service` | `BACKEND-FOUNDATION-001` |
| Migrator agent | `projects/w-data-migrator` | `MIGRATION-S3-001`, `MIGRATION-DRYRUN-001` |
| Admin frontend agent | `projects/w-admin-web` | `ADMIN-FOUNDATION-001` |
| Public frontend agent | `projects/landing-web` | `FRONT-CLIENT-001` |

Отдельный Codex skill имеет смысл создать позже, если появится повторяющийся процесс:

- генерация backend-модуля по SDD;
- обновление OpenAPI и клиентов;
- проверка миграционного отчета;
- создание admin screen по шаблону.

## 6. Практический старт

### Шаг 1. Создать `w-api-contracts`

```bash
mkdir -p /home/dds/dev/stanley-co/w-api-contracts
cp -R /home/dds/dev/stanley-co/web/landing-web/architecture-sdd /home/dds/dev/stanley-co/w-api-contracts/
```

Задача агенту:

```text
Работай только с w-api-contracts.
Сначала реализуй CONTRACT-PUBLIC-001 и CONTRACT-AUTH-001.
Доведи openapi.yaml до валидного состояния.
Добавь команды проверки OpenAPI.
```

Результат этапа:

- валидный `openapi.yaml`;
- описанные public/auth контракты;
- базовые DTO;
- error model;
- pagination model;
- понятная команда lint/check.

### Шаг 2. Создать `w-platform-infra`

```bash
mkdir -p /home/dds/dev/stanley-co/w-platform-infra
cp -R /home/dds/dev/stanley-co/web/landing-web/architecture-sdd /home/dds/dev/stanley-co/w-platform-infra/
```

Задача агенту:

```text
Реализуй INFRA-LOCAL-001.
Создай Docker Compose для postgres, minio, minio-init, mailpit.
Не добавляй Kubernetes.
```

Результат этапа:

- локально поднимаются PostgreSQL, MinIO, Mailpit;
- есть `.env.example`;
- есть health checks;
- есть bucket initialization.

### Шаг 3. Создать `w-backend-service`

```bash
mkdir -p /home/dds/dev/stanley-co/w-backend-service
cp -R /home/dds/dev/stanley-co/web/landing-web/architecture-sdd /home/dds/dev/stanley-co/w-backend-service/
```

Задача агенту:

```text
Реализуй BACKEND-FOUNDATION-001.
Создай Spring Boot 3.x проект на Java 21.
Подключи PostgreSQL, Flyway, OpenAPI, error model, request ID, health checks.
Не реализуй пока весь catalog/content.
```

Результат этапа:

- Spring Boot skeleton;
- миграции;
- health endpoint;
- request ID;
- стандартная ошибка;
- базовые тесты.

### Шаг 4. Auth/RBAC

Следующая задача backend-агенту:

```text
Реализуй BACKEND-AUTH-001 и BACKEND-RBAC-001.
Используй только роли ADMIN, FEATURE_OWNER, CONTENT_READER.
```

### Шаг 5. Storage и Catalog

После auth/RBAC:

```text
BACKEND-STORAGE-001
BACKEND-CATALOG-001
```

Только после этого имеет смысл запускать полноценную миграцию товаров.

### Шаг 6. Создать `w-data-migrator`

```bash
mkdir -p /home/dds/dev/stanley-co/w-data-migrator
cp -R /home/dds/dev/stanley-co/web/landing-web/architecture-sdd /home/dds/dev/stanley-co/w-data-migrator/
```

Задача агенту:

```text
Реализуй MIGRATION-S3-001 и MIGRATION-DRYRUN-001.
Источник данных только текущий S3.
Локальные JSON использовать только для сравнения.
Никаких записей в БД на первом этапе.
```

### Шаг 7. Создать `w-admin-web`

Когда admin API уже есть:

```bash
mkdir -p /home/dds/dev/stanley-co/w-admin-web
cp -R /home/dds/dev/stanley-co/web/landing-web/architecture-sdd /home/dds/dev/stanley-co/w-admin-web/
```

Первые задачи:

```text
ADMIN-FOUNDATION-001
ADMIN-CATALOG-001
ADMIN-CONTENT-001
```

Важно: админка должна использовать generated client из `w-api-contracts`.

### Шаг 8. Вернуться к существующему `landing-web`

Публичный frontend трогать последним:

```text
FRONT-CLIENT-001
FRONT-CATALOG-001
FRONT-PRODUCT-001
FRONT-CONTENT-001
FRONT-LEADS-001
FRONT-LEGACY-001
```

Правила:

- не переписывать UI;
- не менять `/home`;
- не менять `/news/:id`;
- не читать S3 JSON после подключения API;
- не хранить Telegram/Bitrix secrets.

## 7. Что запускать

На документационном этапе запускать нечего.

После создания `w-platform-infra`:

```bash
docker compose up
```

После создания `w-backend-service`:

```bash
./mvnw test
./mvnw spring-boot:run
```

После создания `w-api-contracts` команда будет зависеть от выбранного tooling. Возможный вариант:

```bash
npx @redocly/cli lint openapi/openapi.yaml
```

После создания frontend/admin проектов:

```bash
npm install
npm run dev
npm run build
```

## 8. Главное правило

Не создавай все проекты и не проси всех агентов сразу “реализовать систему”.

Правильный порядок:

1. стабилизировать API-контракты;
2. поднять локальную инфраструктуру;
3. сделать backend foundation;
4. сделать auth/RBAC/storage/catalog/content;
5. сделать миграцию;
6. сделать admin;
7. подключить публичный frontend.

Первый конкретный шаг:

```text
Создать w-api-contracts и отдать агенту CONTRACT-PUBLIC-001 + CONTRACT-AUTH-001.
```

