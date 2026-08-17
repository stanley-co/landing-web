# Задача: аудит проекта и настройка CI/CD тестового стенда на GitHub Actions

Необходимо изучить текущее состояние всех репозиториев проекта FKIT и реализовать единый CI/CD-процесс на базе GitHub Actions.

Проект состоит из нескольких компонентов:

1. публичный веб-лендинг;
2. административная веб-панель;
3. backend-сервис;
4. PostgreSQL или другая фактически используемая база данных;
5. S3-совместимое файловое хранилище;
6. инфраструктурные компоненты;
7. дополнительные сервисы, обнаруженные во время аудита.

На текущем этапе необходимо полностью настроить только тестовый стенд.

Архитектура CI/CD при этом должна заранее учитывать будущий промо- или production-деплой, однако:

* production deployment сейчас не реализовывать;
* production-сервер не изменять;
* production-домен не изменять;
* production-секреты не использовать;
* production-базу и production-хранилище не использовать.

---

# 1. Главная цель

Необходимо получить рабочий процесс, при котором:

```text
feature/* → только проверки CI
develop   → автоматическая сборка и деплой на test
release/* → в будущем деплой на promo/production
```

На данном этапе реализуется только:

```text
feature/* → CI
develop   → CI + build image + deploy test
```

Для release-веток необходимо подготовить архитектуру и структуру workflows, но фактический deployment на промо- или production-стенд пока не выполнять.

---

# 2. Обязательное изучение репозитория landing-web

Репозиторий `landing-web` уже содержит принятую структуру ветвления и историю работы с release-ветками.

Перед проектированием общего Git Flow обязательно:

1. клонируй или открой репозиторий `landing-web`;
2. изучи:

```bash
git branch -a
git log --all --graph --decorate --oneline
git tag --list
```

3. определи:

   * название основной стабильной ветки;
   * наличие ветки `develop`;
   * формат feature-веток;
   * формат release-веток;
   * существующие merge-коммиты;
   * существующие релизные теги;
   * текущий процесс выпуска версий;
   * наличие hotfix-веток;
   * наличие старых CI/CD workflows;
   * правила работы, которые можно восстановить из истории Git.

Не придумывай новый Git Flow, если в `landing-web` уже используется согласованная схема.

Используй `landing-web` как основной пример для унификации ветвления остальных сервисов, если это не противоречит их текущей структуре.

Результаты анализа зафиксируй в документации.

---

# 3. Целевая схема ветвления

Базовая схема должна выглядеть следующим образом.

## 3.1. Feature-ветки

Примеры:

```text
feature/FKIT-123-add-news
feature/test-cicd
feature/admin-auth
feature/s3-migration
```

Feature-ветки предназначены для разработки отдельных изменений.

При push в feature-ветку:

* не выполнять deployment;
* не обновлять тестовый стенд;
* не публиковать тег `test`;
* не менять инфраструктуру сервера;
* не применять миграции к общей тестовой базе.

Разрешено выполнять:

* checkout;
* установку зависимостей;
* линтинг;
* статический анализ;
* unit-тесты;
* integration-тесты с временными контейнерами;
* сборку приложения;
* проверку Docker build;
* security scanning;
* проверку формата миграций;
* создание временных артефактов сборки.

Feature-ветки должны подтверждать, что изменения технически готовы к слиянию в `develop`.

## 3.2. Ветка develop

Ветка:

```text
develop
```

является интеграционной веткой и источником тестового стенда.

Каждый принятый push или merge в `develop` должен запускать:

1. полный CI;
2. сборку Docker image;
3. публикацию image в registry;
4. версионирование image;
5. deployment на тестовый сервер;
6. применение миграций;
7. health checks;
8. smoke tests;
9. фиксацию развернутой версии;
10. rollback при неуспешном deployment, если откат безопасен.

Тестовый стенд должен отражать последнее успешно развернутое состояние ветки `develop`.

Неудачная сборка или тесты не должны обновлять тестовый стенд.

Неудачный deployment не должен считаться успешным workflow.

## 3.3. Release-ветки

Формат release-веток необходимо определить по репозиторию `landing-web`.

Возможные примеры:

```text
release/1.2.0
release/v1.2.0
release-1.2.0
```

Используй фактически применяемый формат.

В будущей архитектуре release-ветка должна использоваться для deployment на промо- или production-стенд.

На текущем этапе:

* не подключать production-сервер;
* не добавлять реальные production-секреты;
* не выполнять production deployment;
* не создавать workflow, который случайно может задеплоить production;
* не использовать production environment без отдельной защиты.

Допускается создать отключённый шаблон или документированную архитектуру будущего workflow, но он не должен выполнять deployment.

Например, можно подготовить:

```text
.github/workflows/deploy-promo.template.yml
```

или описать будущий workflow в документации.

Не создавай активный workflow с пустыми или фиктивными production credentials.

## 3.4. Основная стабильная ветка

Название основной стабильной ветки определить из репозитория:

```text
main
```

или:

```text
master
```

Не переименовывай её самостоятельно.

Основная ветка должна содержать стабильный код.

Не выполнять deployment тестового стенда из основной ветки, если текущий Git Flow проекта явно не требует этого.

## 3.5. Hotfix-ветки

Если в истории `landing-web` используются hotfix-ветки, зафиксируй их формат и будущую роль.

На текущем этапе hotfix-ветка:

* проходит CI;
* не деплоится автоматически на test, если не слита в `develop`;
* не деплоится на production;
* не обходит обязательные проверки.

---

# 4. События и поведение pipeline

Необходимо реализовать следующую матрицу.

| Событие                    |                         CI |               Docker image |              Push в registry | Test deployment | Promo deployment |
| -------------------------- | -------------------------: | -------------------------: | ---------------------------: | --------------: | ---------------: |
| Push в `feature/*`         |                         Да |             Проверка build |      Нет или временный image |             Нет |              Нет |
| Pull Request в `develop`   |                         Да |             Проверка build |                          Нет |             Нет |              Нет |
| Push или merge в `develop` |                         Да |                         Да |                           Да |              Да |              Нет |
| Ручной запуск test deploy  |           По необходимости | Использовать готовый image |   Нет, если image существует |              Да |              Нет |
| Push в `release/*`         |                         Да | Архитектурно предусмотрено |          Пока не обязательно |             Нет | Сейчас запрещено |
| Tag `v*`                   | Архитектурно предусмотрено | Архитектурно предусмотрено | Сейчас без production deploy |             Нет | Сейчас запрещено |
| Push в `main`/`master`     |                         Да |          По принятой схеме |            По принятой схеме |      Обычно нет | Сейчас запрещено |

---

# 5. Общие требования к архитектуре

Использовать:

* GitHub Actions;
* Docker;
* GitHub Container Registry, если нет действующего registry;
* Docker Compose на тестовом сервере;
* GitHub Environments;
* immutable image tags;
* health checks;
* smoke tests;
* controlled database migrations;
* rollback;
* documentation as code.

Не использовать Jenkins.

Для текущего масштаба проекта Jenkins создаст лишние затраты на:

* отдельный сервер;
* обновление Jenkins;
* установку и обновление plugins;
* резервное копирование конфигурации;
* управление credentials;
* дополнительную поверхность атаки;
* ручное сопровождение executor-узлов.

Не использовать Kubernetes без объективной необходимости.

Для небольшого стартапа предпочтительная архитектура тестового стенда:

```text
GitHub Actions
      ↓
GitHub Container Registry
      ↓
SSH / secure deployment mechanism
      ↓
Docker Compose на test VM
      ↓
Reverse proxy
      ↓
Frontend / Admin / Backend / PostgreSQL / S3-compatible storage
```

---

# 6. Первый этап: полный аудит

Перед изменением workflows изучи все относящиеся к проекту репозитории.

Для каждого репозитория зафиксируй:

* имя;
* назначение;
* URL;
* default branch;
* наличие `develop`;
* используемый Git Flow;
* release branch format;
* язык;
* runtime;
* package manager;
* build system;
* версия Java, Node.js, Python или другого runtime;
* команда установки зависимостей;
* команда линтинга;
* команда тестирования;
* команда сборки;
* команда запуска;
* наличие Dockerfile;
* наличие compose-файлов;
* наличие `.env.example`;
* используемые порты;
* health endpoint;
* зависимости;
* работа с базой;
* работа с S3;
* инструмент миграций;
* существующие GitHub Actions;
* существующие deployment scripts;
* существующие secrets references;
* существующие environments;
* наличие релизных тегов.

Создай документ:

```text
docs/ci-cd/current-state-audit.md
```

Если единого документа невозможно разместить в одном репозитории, создай его в инфраструктурном репозитории.

---

# 7. Второй этап: проектирование общего Git Flow

На основании `landing-web` создай документ:

```text
docs/ci-cd/git-flow.md
```

Документ должен содержать:

* схему веток;
* правила создания feature-веток;
* правила merge в `develop`;
* правила создания release-веток;
* правила merge release-веток;
* правила тегирования;
* правила hotfix;
* обязательные CI-проверки;
* список protected branches;
* правила Pull Request;
* запрет прямого production deployment;
* соответствие веток окружениям.

Ожидаемое соответствие:

```text
feature/* → no environment
develop   → test
release/* → promo, в будущем
main      → production, в будущем или по фактической схеме проекта
```

Не навязывай `main → production`, если история `landing-web` показывает другую модель.

---

# 8. GitHub Actions workflows

В каждом deployable-репозитории создай понятный набор workflows.

Предпочтительная структура:

```text
.github/
└── workflows/
    ├── ci.yml
    ├── build-image.yml
    └── deploy-test.yml
```

Можно объединить workflows, если это уменьшает дублирование и сохраняет прозрачность.

---

# 9. Workflow CI

Файл:

```text
.github/workflows/ci.yml
```

Должен запускаться:

```yaml
on:
  push:
    branches:
      - develop
      - main
      - master
      - "feature/**"
      - "release/**"
      - "hotfix/**"
  pull_request:
    branches:
      - develop
      - main
      - master
```

Адаптируй список под реальные ветки.

CI должен выполнять:

1. checkout;
2. установку runtime;
3. кэширование зависимостей;
4. установку зависимостей;
5. линтинг;
6. форматирование или проверку форматирования;
7. статический анализ;
8. unit-тесты;
9. integration-тесты;
10. сборку;
11. проверку Docker build;
12. при наличии — security scan;
13. при наличии — проверку миграций.

Не добавляй фиктивные тесты.

Если тестов нет:

* зафиксируй это как риск;
* не имитируй успешное тестирование;
* добавь минимум безопасных smoke/build checks;
* не переписывай бизнес-логику ради CI/CD.

Для feature-веток workflow заканчивается после CI.

Никакого deployment из feature-ветки.

---

# 10. Workflow сборки Docker image

Файл:

```text
.github/workflows/build-image.yml
```

Для ветки `develop` workflow должен:

1. запускаться только после успешного CI;
2. собрать production-ready Docker image;
3. использовать Docker Buildx;
4. использовать layer cache;
5. авторизоваться в GHCR;
6. добавить OCI labels;
7. добавить immutable tags;
8. опубликовать image;
9. вывести image digest;
10. передать image reference в deployment workflow.

Минимальные теги:

```text
ghcr.io/<owner>/<service>:sha-<full-sha>
ghcr.io/<owner>/<service>:sha-<short-sha>
ghcr.io/<owner>/<service>:develop
ghcr.io/<owner>/<service>:test
```

Главным источником истины должен быть:

```text
sha-<full-sha>
```

Теги `develop` и `test` могут быть mutable aliases.

Не использовать только:

```text
latest
```

Допускается не публиковать Docker image для feature-веток.

Если необходимо проверить Docker build в feature-ветке, image должен собираться локально внутри runner без push в registry.

---

# 11. Workflow test deployment

Файл:

```text
.github/workflows/deploy-test.yml
```

Должен запускаться:

* автоматически после успешной сборки ветки `develop`;
* вручную через `workflow_dispatch`.

Ручной запуск должен позволять выбрать:

* image tag;
* image digest;
* commit SHA;
* либо использовать последнее успешное состояние `develop`.

Deployment должен выполняться только в GitHub Environment:

```text
test
```

Workflow должен:

1. проверить, что запускается разрешённая версия;
2. получить immutable image reference;
3. установить защищённое соединение с test VM;
4. проверить доступность сервера;
5. проверить свободное место;
6. проверить Docker daemon;
7. авторизовать сервер в registry безопасным способом;
8. сохранить текущую версию;
9. скачать новый image;
10. создать backup базы перед опасной миграцией;
11. применить миграции;
12. обновить сервис;
13. дождаться health checks;
14. выполнить smoke tests;
15. зафиксировать deployed version;
16. удалить старые неиспользуемые images безопасным способом;
17. выполнить rollback при ошибке после обновления, если это безопасно.

---

# 12. Запрет deployment из feature-веток

Это обязательное архитектурное правило.

Даже при ручном изменении YAML feature-ветка не должна иметь возможность автоматически обновить общий тестовый стенд.

Предусмотри защиту не только на уровне trigger, но и на уровне job condition.

Пример логики:

```yaml
if: github.ref == 'refs/heads/develop'
```

Для reusable workflows передавай branch и проверяй его повторно.

GitHub Environment `test` должен разрешаться только workflow из ожидаемых веток, если возможности GitHub-аккаунта позволяют применить deployment branch protection rules.

---

# 13. Concurrency и защита от параллельных deployment

Не допускай одновременного deployment нескольких commits ветки `develop` на один тестовый стенд.

Используй:

```yaml
concurrency:
  group: test-deployment
  cancel-in-progress: false
```

Либо более подходящую стратегию.

Не отменяй deployment в середине миграции базы, если это может повредить состояние данных.

Если новый commit пришёл во время deployment:

* текущий deployment должен безопасно завершиться;
* следующий deployment должен стартовать после него;
* либо устаревший deployment может быть отменён только до начала критической секции.

---

# 14. Общий deployment orchestration

Определи, как согласовать версии нескольких независимых сервисов.

Возможны два подхода.

## Вариант A. Каждый репозиторий деплоит себя

Подходит, если сервисы могут обновляться независимо.

Например:

```text
landing-web develop → deploy landing-web test
admin-web develop   → deploy admin-web test
backend develop     → deploy backend test
```

При этом каждый workflow должен менять только свой сервис.

Не разрешать frontend workflow перезапускать базу или backend без необходимости.

## Вариант B. Центральный инфраструктурный репозиторий

Подходит, если необходимо согласованно обновлять набор версий.

Сервисный репозиторий:

1. собирает image;
2. публикует image;
3. вызывает deployment workflow инфраструктурного репозитория;
4. передаёт image digest;
5. инфраструктурный репозиторий обновляет compose manifest.

После аудита выбери подходящий вариант.

Для нескольких независимых репозиториев предпочтительно:

* сборка image в сервисном репозитории;
* deployment logic в инфраструктурном репозитории;
* reusable workflows или repository dispatch только при необходимости.

Не создавай избыточно сложную оркестрацию.

---

# 15. Инфраструктурный репозиторий

Проверь наличие отдельного репозитория инфраструктуры.

Если он существует, используй его.

Если нет, создай приватный репозиторий только после проверки, что аналогичной конфигурации действительно нет.

Рекомендуемое название:

```text
fkit-test-infrastructure
```

Пример структуры:

```text
.
├── compose.yml
├── compose.test.yml
├── .env.example
├── versions/
│   └── test.env
├── nginx/
│   ├── nginx.conf
│   └── conf.d/
├── scripts/
│   ├── bootstrap-server.sh
│   ├── deploy-service.sh
│   ├── deploy-stack.sh
│   ├── migrate.sh
│   ├── smoke-test.sh
│   ├── healthcheck.sh
│   ├── rollback.sh
│   └── backup-database.sh
├── docs/
│   └── ci-cd/
└── README.md
```

Файл версий может выглядеть так:

```env
LANDING_IMAGE=ghcr.io/<owner>/landing-web@sha256:...
ADMIN_IMAGE=ghcr.io/<owner>/admin-web@sha256:...
BACKEND_IMAGE=ghcr.io/<owner>/backend@sha256:...
POSTGRES_IMAGE=postgres:17.x
```

Предпочтительно использовать digest, а не mutable tag.

---

# 16. Отдельное правило для landing-web

Репозиторий `landing-web` требует особой осторожности.

Перед изменением:

1. изучи историю Git;
2. изучи существующие ветки;
3. изучи release-flow;
4. изучи текущие workflows;
5. изучи текущий способ deployment;
6. изучи frontend environment variables;
7. найди текущие API endpoints;
8. найди production URLs;
9. найди формы и их endpoints.

Все CI/CD-изменения сначала выполняй в отдельной ветке:

```text
feature/test-cicd
```

Не отправляй изменения напрямую в стабильную ветку.

После проверки:

* создай Pull Request в `develop`;
* не выполняй merge в `main`, `master` или release-ветку;
* не меняй production deployment;
* не меняй production API URL;
* не меняй production-домен.

Deployment landing-web на test должен происходить только после merge CI/CD-изменений в `develop`.

---

# 17. Frontend environment configuration

Для каждого frontend-приложения раздели конфигурации окружений.

Пример:

```text
.env.example
.env.development.example
.env.test.example
.env.production.example
```

Не коммить реальные секреты.

Frontend test build должен получать:

* test API URL;
* test storage public URL;
* test analytics configuration или отключённую аналитику;
* test feature flags;
* test environment marker.

Не используй production backend в test build.

Проверь, что frontend build-time variables не содержат секреты.

Все переменные, попадающие в JavaScript bundle, считать публичными.

---

# 18. Backend configuration

Backend должен использовать профили окружений.

Для Spring Boot предпочтительно:

```text
application.yml
application-test.yml
application-prod.yml
```

Реальные значения получать из environment variables.

Test backend должен использовать:

* отдельный database URL;
* отдельного database user;
* отдельный database password;
* отдельный S3 bucket;
* отдельный S3 access key;
* отдельный S3 secret key;
* отдельный JWT secret;
* test CORS origins;
* test public URLs.

Не коммитить реальные значения.

---

# 19. База данных

Для тестового стенда использовать отдельную базу данных.

Если применяется PostgreSQL:

* использовать официальный image;
* закрепить major и minor version;
* настроить persistent volume;
* настроить `pg_isready`;
* не открывать порт наружу без необходимости;
* разрешить подключение только backend и административным инструментам;
* создать backup strategy.

Инструмент миграций определить по проекту:

* Flyway;
* Liquibase;
* Prisma;
* Alembic;
* другой существующий механизм.

Не внедряй второй механизм миграций.

Миграции должны выполняться:

* только при deployment backend;
* только одним процессом;
* до переключения backend на новую версию либо по фактической безопасной схеме;
* с контролем exit code;
* с резервной копией перед destructive changes.

Feature-ветки не должны применять миграции к общей test DB.

Integration-тесты feature-веток должны использовать временный database container.

---

# 20. S3-совместимое хранилище

Определи текущее хранилище:

* AWS S3;
* MinIO;
* Yandex Object Storage;
* Selectel;
* другое S3-compatible решение.

Для test должны использоваться отдельные:

* endpoint;
* region;
* bucket;
* access key;
* secret key;
* public URL.

Production bucket запрещён.

Если отдельного test storage нет, разверни MinIO на тестовом стенде, если это соответствует архитектуре.

Подготовь:

* bucket initialization;
* health check;
* lifecycle rules при необходимости;
* отдельного технического пользователя;
* минимальные permissions;
* smoke test загрузки и удаления временного объекта.

---

# 21. Reverse proxy

Настрой reverse proxy для test environment.

Предпочтительный выбор:

* Nginx;
* Caddy;
* Traefik.

Выбери один на основании текущей инфраструктуры.

Маршруты должны покрывать:

* landing frontend;
* admin frontend;
* backend API;
* storage public endpoint при необходимости;
* health endpoints с ограничением доступа.

Если тестового домена нет, допускается временное использование:

```text
http://<test-server-ip>:<port>
```

Но архитектура должна позволять подключить test domain без переделки сервисов.

Production domain не изменять.

---

# 22. Health checks

Каждый контейнер должен иметь health check, если это технически возможно.

Backend:

```text
GET /actuator/health
```

или существующий endpoint.

Проверка должна учитывать:

* запуск приложения;
* подключение к базе;
* критические зависимости;
* при необходимости доступность S3.

Frontend:

* HTTP 200;
* наличие ожидаемого HTML;
* загрузка основных assets.

Admin panel:

* HTTP 200;
* загрузка login page;
* доступность backend.

PostgreSQL:

```bash
pg_isready
```

S3/MinIO:

* HTTP health endpoint;
* безопасная тестовая операция.

---

# 23. Smoke tests

После каждого deployment из `develop` выполнить smoke tests.

Минимальный набор:

1. открыть landing page;
2. проверить HTTP status;
3. проверить наличие ключевого элемента страницы;
4. открыть admin panel;
5. проверить backend health;
6. выполнить безопасный API request;
7. проверить подключение backend к test DB;
8. проверить доступность test S3;
9. проверить тестовую отправку формы;
10. проверить, что форма не обращается к production endpoint.

Smoke tests должны возвращать ненулевой exit code при ошибке.

---

# 24. Deployment metadata

После успешного deployment зафиксируй:

* repository;
* branch;
* commit SHA;
* image tag;
* image digest;
* GitHub Actions run ID;
* deployment timestamp;
* migration version;
* deployed service version.

Можно создать файл на сервере:

```text
/opt/fkit/deployments/current.json
```

Пример:

```json
{
  "environment": "test",
  "deployedAt": "2026-07-21T18:00:00Z",
  "services": {
    "landing": {
      "repository": "landing-web",
      "branch": "develop",
      "commit": "abcdef123456",
      "image": "ghcr.io/example/landing-web@sha256:..."
    }
  }
}
```

Не хранить в этом файле секреты.

---

# 25. Rollback

Перед обновлением сохраняй предыдущий image digest.

Для каждого сервиса должна быть возможность:

```bash
./scripts/rollback.sh backend
./scripts/rollback.sh landing
./scripts/rollback.sh admin
```

Rollback должен:

1. определить предыдущую рабочую версию;
2. вернуть image;
3. перезапустить только нужный сервис;
4. дождаться health check;
5. выполнить smoke test;
6. зафиксировать результат.

Не выполнять автоматический rollback database schema, если это может повредить данные.

Миграции должны проектироваться backward-compatible.

Предпочтительная стратегия:

1. expand;
2. deploy;
3. migrate data;
4. contract в отдельном релизе.

---

# 26. GitHub Secrets и Variables

Используй GitHub Environment:

```text
test
```

В environment хранить тестовые секреты.

Примерный перечень:

```text
TEST_SERVER_HOST
TEST_SERVER_PORT
TEST_SERVER_USER
TEST_SERVER_SSH_KEY
TEST_DEPLOY_PATH

TEST_DB_HOST
TEST_DB_PORT
TEST_DB_NAME
TEST_DB_USER
TEST_DB_PASSWORD

TEST_S3_ENDPOINT
TEST_S3_REGION
TEST_S3_BUCKET
TEST_S3_ACCESS_KEY
TEST_S3_SECRET_KEY

TEST_JWT_SECRET
TEST_API_URL
TEST_ADMIN_URL
TEST_LANDING_URL
```

Адаптируй перечень по фактической архитектуре.

Не выводить значения secrets в logs.

Не передавать секреты через Docker build arguments, если они могут попасть в image history.

Использовать минимальные permissions:

```yaml
permissions:
  contents: read
  packages: write
```

Дополнительные permissions добавлять только при необходимости.

---

# 27. Branch protection recommendations

Подготовь рекомендации по защите веток.

Для `develop`:

* запрет прямого push или ограничение круга пользователей;
* Pull Request обязателен;
* CI обязателен;
* approvals по необходимости;
* branch must be up to date;
* запрещён merge при failed checks.

Для основной ветки:

* обязательный Pull Request;
* обязательные reviews;
* обязательные checks;
* запрет force push;
* запрет удаления ветки;
* запрет deployment без protected environment.

Для `release/*`:

* обязательный CI;
* запрет автоматического production deployment на текущем этапе;
* approvals перед будущим promo deployment.

Не меняй организационные настройки GitHub без необходимости. Если прав недостаточно, сформируй точный список рекомендаций.

---

# 28. Reusable workflows

Если workflows во всех репозиториях сильно повторяются, рассмотри reusable workflows.

Например:

```text
.github/workflows/reusable-node-ci.yml
.github/workflows/reusable-java-ci.yml
.github/workflows/reusable-docker-build.yml
.github/workflows/reusable-test-deploy.yml
```

Однако не создавай централизованную систему, которая делает pipeline непонятным или хрупким.

Версии reusable workflows должны быть зафиксированы tag или SHA.

Не подключай reusable workflow через плавающую ветку без причины.

---

# 29. Test server bootstrap

Перед первым deployment изучи сервер.

Проверь:

```bash
uname -a
cat /etc/os-release
df -h
free -h
docker version
docker compose version
ss -tulpn
```

Проверь:

* OS;
* CPU architecture;
* RAM;
* disk;
* SSH;
* firewall;
* Docker;
* Compose;
* running services;
* occupied ports;
* DNS;
* time synchronization.

Если сервер пустой, установи:

* Docker Engine;
* Docker Compose Plugin;
* минимально необходимые утилиты;
* reverse proxy;
* deploy user;
* директорию приложения.

Не устанавливай Jenkins.

Создай структуру:

```text
/opt/fkit/
├── compose/
├── env/
├── deployments/
├── backups/
├── scripts/
└── logs/
```

Настрой permissions безопасно.

Не запускай сервисы от root без необходимости.

---

# 30. Документация

Создай документы:

```text
docs/ci-cd/current-state-audit.md
docs/ci-cd/git-flow.md
docs/ci-cd/test-environment-design.md
docs/ci-cd/test-deployment-runbook.md
docs/ci-cd/future-promo-deployment.md
```

## current-state-audit.md

Содержит результаты обследования.

## git-flow.md

Содержит фактическую схему веток на основе `landing-web`.

## test-environment-design.md

Содержит:

* компоненты;
* registry;
* server;
* compose;
* networking;
* secrets;
* migrations;
* storage;
* rollback.

## test-deployment-runbook.md

Содержит:

* первый deployment;
* повторный deployment;
* ручной deployment;
* просмотр logs;
* проверку health;
* rollback;
* backup;
* восстановление;
* замену secret;
* устранение типовых ошибок.

## future-promo-deployment.md

Содержит только проект будущей схемы:

```text
release/* → promo
```

Не содержит реальных production credentials.

---

# 31. Порядок выполнения задачи

Выполняй работу последовательно.

## Шаг 1. Найти все репозитории

Составить список сервисов и инфраструктуры.

## Шаг 2. Изучить landing-web

Обязательно выполнить анализ истории Git и веток.

## Шаг 3. Провести аудит остальных репозиториев

Определить build, test, Docker, runtime, environments.

## Шаг 4. Зафиксировать фактический Git Flow

Не начинать массовое внедрение workflows до понимания release-схемы.

## Шаг 5. Спроектировать test architecture

Определить registry, compose, deployment ownership и secrets.

## Шаг 6. Создать CI для feature-веток

Проверить отсутствие deployment.

## Шаг 7. Создать CI и build для develop

Публиковать immutable image.

## Шаг 8. Создать deploy-test

Обновлять только test environment.

## Шаг 9. Подготовить сервер

Установить и настроить необходимое ПО.

## Шаг 10. Развернуть инфраструктуру

PostgreSQL, storage, proxy и сети.

## Шаг 11. Развернуть backend

Применить миграции и проверить health.

## Шаг 12. Развернуть admin panel

Подключить к test backend.

## Шаг 13. Развернуть landing

Подключить к test backend и test storage.

## Шаг 14. Проверить формы

Убедиться, что используются test endpoints.

## Шаг 15. Выполнить smoke tests

Все проверки должны пройти.

## Шаг 16. Проверить rollback

Выполнить безопасную проверку отката хотя бы одного сервиса.

## Шаг 17. Запушить изменения

Использовать отдельные ветки и Pull Requests.

## Шаг 18. Сформировать итоговый отчёт

Зафиксировать версии, commits, images и URLs.

---

# 32. Правила внесения изменений в Git

Не смешивать функциональные изменения и CI/CD.

Использовать ветки:

```text
feature/test-cicd
chore/test-pipeline
infrastructure/test-environment
```

Примеры commits:

```text
ci: add feature branch validation
ci: build develop image
ci: deploy develop to test environment
chore: add test compose stack
chore: add backend health check
docs: document git flow
docs: add test deployment runbook
```

Не выполнять:

* force push;
* переписывание истории;
* прямой push в protected branch;
* merge в release;
* merge в production branch;
* merge landing-web в стабильную ветку.

Для каждого репозитория:

1. создать отдельную ветку;
2. внести изменения;
3. проверить;
4. запушить;
5. создать Pull Request в `develop`;
6. не выполнять merge без разрешения, если merge может затронуть действующую систему.

Если разрешено автономное слияние в `develop` и все проверки успешны, можно выполнить merge только после подтверждения, что `develop` предназначен для test deployment.

---

# 33. Обязательные проверки перед push

Перед push выполнить:

* YAML validation;
* Dockerfile lint;
* shell script syntax validation;
* unit tests;
* build;
* Docker build;
* проверку `.gitignore`;
* поиск секретов;
* проверку отсутствия production URLs в test configuration;
* проверку workflow triggers;
* проверку, что feature branches не деплоятся;
* проверку, что develop деплоится только в test;
* проверку, что release deployment отключён.

---

# 34. Итоговый отчёт

Предоставь таблицу:

| Репозиторий | Назначение | Рабочая ветка | Target branch | Commit | PR | Workflow |
| ----------- | ---------- | ------------- | ------------- | ------ | -- | -------- |

Отдельно предоставь таблицу:

| Ветка         | CI |      Build image | Environment | Deployment     |
| ------------- | -: | ---------------: | ----------- | -------------- |
| `feature/*`   | Да |  Только проверка | Нет         | Нет            |
| `develop`     | Да |               Да | Test        | Да             |
| `release/*`   | Да |        В будущем | Promo       | Пока отключено |
| `main/master` | Да | По будущей схеме | Production  | Пока отключено |

Предоставь список развернутых сервисов:

| Сервис | Commit | Image tag | Digest | Health | URL |
| ------ | ------ | --------- | ------ | ------ | --- |

Также укажи:

* test server;
* landing URL;
* admin URL;
* backend URL;
* health URL;
* storage endpoint;
* database version;
* migration version;
* последний успешный workflow run;
* время deployment;
* способ rollback.

Не выводи значения секретов.

---

# 35. Критерии приёмки

Задача считается выполненной, если:

1. Проанализирована история Git репозитория `landing-web`.
2. Определена фактическая схема release-веток.
3. Git Flow задокументирован.
4. Feature-ветки проходят CI.
5. Feature-ветки не выполняют deployment.
6. Pull Requests в `develop` проходят CI.
7. Push или merge в `develop` собирает Docker image.
8. Image публикуется с immutable tag.
9. Push или merge в `develop` обновляет test environment.
10. Неуспешный CI не обновляет test.
11. Неуспешный deployment возвращает ошибку.
12. Deployment jobs защищены от параллельного запуска.
13. Backend работает с test DB.
14. Backend работает с test S3.
15. Admin panel работает с test backend.
16. Landing работает с test backend.
17. Формы landing используют test endpoints.
18. Health checks проходят.
19. Smoke tests проходят.
20. Реализован rollback.
21. Секреты не находятся в Git.
22. Production infrastructure не изменена.
23. Release deployment не активирован.
24. Архитектура будущего `release/* → promo` задокументирована.
25. Все изменения запушены в отдельные ветки.
26. Для изменений подготовлены Pull Requests.
27. Создан полный test deployment runbook.

---

# 36. Главные запреты

Запрещено:

* деплоить feature-ветки;
* использовать feature-ветку как общий тестовый стенд;
* деплоить production;
* деплоить promo на текущем этапе;
* использовать production database;
* использовать production S3 bucket;
* изменять production DNS;
* изменять production domain;
* коммитить secrets;
* выводить secrets в logs;
* выполнять force push;
* обходить failed CI;
* использовать только тег `latest`;
* применять миграции feature-ветки к общей test DB;
* запускать два deployment одновременно;
* устанавливать Jenkins;
* добавлять Kubernetes без доказанной необходимости;
* считать задачу завершённой без фактического успешного deployment из `develop`.

Главный принцип:

```text
Feature-ветки проверяются, но не деплоятся.
Develop всегда представляет тестовый стенд.
Release-ветки резервируются для будущего промо-деплоя.
Production на текущем этапе не затрагивается.
```
