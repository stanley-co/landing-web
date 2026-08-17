# Задача: интеграция лендинга с новым API и полное развертывание тестового стенда

Продолжаем реализацию проекта по утвержденным SDD, ADR и OpenAPI-контрактам.

Теперь необходимо:

1. завершить перевод публичного лендинга на новый backend API;
2. обеспечить работу backend с PostgreSQL и S3-compatible хранилищем;
3. завершить административную панель;
4. подготовить CI/CD;
5. создать или подключить GitHub-репозитории;
6. собрать Docker-образы;
7. развернуть всю систему на новой виртуальной машине;
8. настроить тестовый стенд;
9. провести сквозное тестирование;
10. исправлять обнаруженные ошибки до полного прохождения критериев приемки.

Не ограничивайся написанием документации или созданием scaffold.

Необходимо фактически развернуть работоспособную систему.

---

# 1. Рабочие окружения

## 1.1. Локальное рабочее пространство

Основная директория:

```text
/home/dds/dev/stanley-co
```

Структура:

```text
/home/dds/dev/stanley-co/
├── back/
├── fkit/
├── todo/
├── troubleshot/
└── web/
```

Backend-проекты размещаются в:

```text
/home/dds/dev/stanley-co/back
```

Frontend-проекты размещаются в:

```text
/home/dds/dev/stanley-co/web
```

Ожидаемые проекты:

```text
back/
├── w-backend-service/
├── w-api-contracts/
├── w-platform-infra/
└── w-data-migrator/        # пока остается DEFERRED, если SDD не изменен

web/
├── landing-web/
└── w-admin-web/
```

Отдельный `w-api-gateway` создается только в случае, если актуальный ADR требует отдельное приложение.

Если gateway реализуется как edge layer внутри backend, отдельный сервис не создавать.

## 1.2. Тестовая виртуальная машина

SSH-доступ:

```bash
ssh -i ~/.ssh/id_ed25519 kitexp@84.54.56.12
```

Операционная система:

```text
Ubuntu 22.04.5 LTS
```

IP:

```text
84.54.56.12
```

Пользователь:

```text
kitexp
```

Используй SSH-ключ.

Не запрашивай и не сохраняй пароль пользователя, если доступ по ключу уже работает.

Перед любыми действиями проверь:

```bash
ssh -i ~/.ssh/id_ed25519 kitexp@84.54.56.12 \
  'whoami && hostname && uname -a && df -h && free -h && sudo -n true; echo $?'
```

Если `sudo -n true` не работает, определи доступный безопасный способ установки Docker и настройки системы.

Не изменяй SSH-ключи пользователя без необходимости.

---

# 2. Ограничения тестового стенда

## 2.1. Домены

Не изменять:

* DNS;
* `kitexp.ru`;
* `kitexp.ru.ru`;
* существующие доменные записи;
* production nginx;
* production-сертификаты;
* production CDN.

Тестовый стенд должен работать независимо от действующего домена.

## 2.2. Адреса тестового стенда

На первом этапе использовать IP и path-based routing:

```text
https://84.54.56.12/          — публичный лендинг
https://84.54.56.12/admin/    — административная панель
https://84.54.56.12/api/      — backend API
```

Также предусмотреть:

```text
https://84.54.56.12/actuator/health
```

или отдельный безопасный health endpoint.

## 2.3. HTTPS

Поскольку административная панель использует авторизацию, не передавать учетные данные по открытому HTTP.

До подключения отдельного тестового домена использовать self-signed TLS-сертификат с IP в Subject Alternative Name.

Требования:

* сертификат генерируется автоматически при инициализации стенда;
* приватный ключ хранится только на VM;
* приватный ключ не попадает в Git;
* HTTP перенаправляется на HTTPS;
* в документации указать, что браузер покажет предупреждение о недоверенном тестовом сертификате;
* автоматические smoke-тесты используют `curl --insecure` только для этого тестового сертификата.

Не отключать TLS-проверку в коде frontend или backend.

## 2.4. Сетевые порты

Публично открыть только:

```text
22/tcp
80/tcp
443/tcp
```

Не открывать наружу:

```text
5432  — PostgreSQL
9000  — MinIO API
9001  — MinIO Console
8025  — Mailpit
1025  — SMTP Mailpit
backend internal port
```

Внутренние сервисы должны находиться в Docker network.

Для доступа к Mailpit или MinIO Console использовать SSH tunnel:

```bash
ssh -L 8025:127.0.0.1:8025 \
    -L 9001:127.0.0.1:9001 \
    -i ~/.ssh/id_ed25519 \
    kitexp@84.54.56.12
```

---

# 3. Решение по CI/CD

## 3.1. Использовать GitHub Actions

Не устанавливать Jenkins.

Причины:

* проекты уже связаны с GitHub;
* необходимо несколько отдельных репозиториев;
* GitHub Actions достаточно для сборки, тестирования и доставки;
* нет необходимости расходовать ресурсы VM на Jenkins Controller;
* не требуется отдельное обслуживание Jenkins, plugins и credentials;
* Docker-образы можно хранить в GHCR;
* VM должна быть runtime-стендом, а не общим CI runner.

## 3.2. Не устанавливать self-hosted GitHub Actions runner на VM

CI выполняется на GitHub-hosted runners.

VM используется только для:

* Docker runtime;
* PostgreSQL;
* MinIO;
* reverse proxy;
* backend;
* admin frontend;
* landing frontend;
* Mailpit;
* backups;
* deployment scripts.

Deployment выполняется из GitHub Actions по SSH.

Не разрешать workflow выполнять произвольный исходный код непосредственно на VM.

## 3.3. Container Registry

Использовать:

```text
ghcr.io
```

Образы:

```text
ghcr.io/<github-owner>/w-backend-service
ghcr.io/<github-owner>/w-admin-web
ghcr.io/<github-owner>/landing-web
```

При наличии отдельного gateway:

```text
ghcr.io/<github-owner>/w-api-gateway
```

Теги:

```text
sha-<полный или короткий commit SHA>
staging
```

При release tag дополнительно:

```text
vX.Y.Z
```

Запрещено развертывать только по тегу `latest`.

Для deployment использовать immutable SHA tag.

Тег `staging` допускается только как указатель на последний успешно собранный образ.

---

# 4. GitHub-репозитории

## 4.1. Проверка доступа

Локально выполни:

```bash
gh auth status
git config --global --get user.name
git config --global --get user.email
```

Проверь текущие remotes каждого проекта:

```bash
git remote -v
```

## 4.2. Создание репозиториев

Если репозитория не существует и `gh` авторизован, создать private repository:

```bash
gh repo create <owner>/<repo> \
  --private \
  --source=. \
  --remote=origin
```

Ожидаемые репозитории:

```text
landing-web
w-admin-web
w-backend-service
w-api-contracts
w-platform-infra
```

`w-data-migrator` создавать только если его реализация больше не отложена.

Не создавать дубли существующих репозиториев.

Не удалять существующие remotes.

Не делать force push.

## 4.3. Политика веток

Использовать:

```text
main
codex/<task-name>
```

Для изменений:

1. создать feature branch;
2. выполнить локальные коммиты по этапам;
3. push feature branch;
4. создать Pull Request;
5. дождаться CI;
6. исправить все ошибки;
7. после успешного CI выполнить merge в `main`;
8. не использовать squash, если нужно сохранить поэтапные коммиты;
9. merge в `main` запускает сборку образа и deployment staging.

Если создание PR невозможно из-за настроек аккаунта, допускается push в `main` только после локального прохождения всех проверок и документирования причины.

## 4.4. Новое разрешение на push

Предыдущее ограничение «не выполнять push» больше не действует для этой фазы.

Разрешается:

* создавать GitHub-репозитории;
* push веток;
* создавать Pull Requests;
* merge в `main`;
* публиковать Docker-образы в GHCR;
* запускать deployment workflows.

По-прежнему запрещено:

* force push;
* удаление истории;
* публикация секретов;
* push незапускаемого кода;
* merge при красном CI.

---

# 5. GitHub Environments и секреты

## 5.1. Environment

Создать environment:

```text
staging
```

Для каждого deployable репозитория либо на уровне организации, если доступно.

Ограничить deployment веткой:

```text
main
```

## 5.2. Отдельный SSH-ключ для CI/CD

Не использовать личный ключ пользователя `~/.ssh/id_ed25519` внутри GitHub Actions.

Создать отдельную пару:

```text
kitexp-staging-deploy
```

Пример локальной команды:

```bash
ssh-keygen -t ed25519 \
  -C "github-actions-kitexp-staging" \
  -f ~/.ssh/kitexp_staging_deploy \
  -N ""
```

Публичный ключ добавить в:

```text
/home/kitexp/.ssh/authorized_keys
```

на VM.

Приватный ключ сохранить в GitHub Environment Secret:

```text
STAGING_SSH_PRIVATE_KEY
```

После сохранения секрета не коммитить приватный ключ.

Локальную временную копию удалить только после подтверждения, что deployment workflow работает и ключ надежно сохранен.

## 5.3. Pinning SSH host key

Получить host key:

```bash
ssh-keyscan -H 84.54.56.12
```

Сохранить его в environment secret:

```text
STAGING_KNOWN_HOSTS
```

Не использовать:

```text
StrictHostKeyChecking=no
```

## 5.4. Необходимые GitHub secrets

Минимально:

```text
STAGING_HOST=84.54.56.12
STAGING_USER=kitexp
STAGING_SSH_PRIVATE_KEY=<secret>
STAGING_KNOWN_HOSTS=<secret>
GHCR_PULL_USERNAME=<github username>
GHCR_PULL_TOKEN=<fine-grained token with read packages>
```

При необходимости:

```text
STAGING_DEPLOY_PATH=/opt/kitexp-staging
```

Секреты приложения не хранить в каждом workflow.

Они хранятся на VM в защищенном env-файле.

---

# 6. Структура тестового стенда на VM

Использовать:

```text
/opt/kitexp-staging/
├── compose.yaml
├── compose.staging.yaml
├── .env
├── .env.previous
├── bin/
│   ├── deploy-service
│   ├── deploy-all
│   ├── health-check
│   ├── smoke-test
│   ├── backup-postgres
│   ├── backup-minio
│   └── rollback-service
├── config/
│   ├── nginx/
│   └── tls/
├── backups/
│   ├── postgres/
│   └── minio/
├── releases/
├── logs/
└── state/
```

Владельцем файлов должен быть:

```text
kitexp
```

Секретный `.env`:

```bash
chmod 600 /opt/kitexp-staging/.env
```

Скрипты:

```bash
chmod 750 /opt/kitexp-staging/bin/*
```

---

# 7. Состав Docker Compose

Тестовый стенд должен включать:

```text
reverse-proxy
postgres
minio
minio-init
mailpit
w-backend-service
w-admin-web
landing-web
```

При отдельном gateway:

```text
w-api-gateway
```

## 7.1. PostgreSQL

Требования:

* отдельный database;
* отдельный application user;
* persistent volume;
* health check через `pg_isready`;
* пароль генерируется случайно;
* порт не публикуется наружу;
* Flyway выполняется backend-приложением или отдельной migration-командой согласно SDD.

## 7.2. MinIO

Требования:

* отдельный test bucket;
* persistent volume;
* root credentials генерируются;
* application access key может быть отдельным;
* bucket создается idempotent init-container;
* MinIO API не публикуется наружу;
* Console доступна только через SSH tunnel;
* CORS bucket настраивается только при необходимости direct browser upload.

Предпочтительно загружать файлы через backend, а не отдавать S3 credentials браузеру.

## 7.3. Mailpit

Использовать для тестовых email:

* backend отправляет письма через SMTP Mailpit;
* письма не уходят на реальный внешний адрес;
* поле получателя остается `dds_stalker@mail.ru`;
* письмо доступно в Mailpit;
* Mailpit UI только через SSH tunnel.

Не подключать production SMTP на текущем тестовом стенде без отдельного решения.

## 7.4. Reverse proxy

Использовать Nginx.

Маршрутизация:

```text
/            → landing-web
/admin/      → w-admin-web
/api/        → w-backend-service
```

При необходимости:

```text
/actuator/health → backend health
```

Требования:

* HTTPS;
* HTTP redirect;
* SPA fallback для `/`;
* SPA fallback для `/admin/`;
* правильная передача `X-Forwarded-*`;
* ограничения upload size;
* security headers;
* gzip;
* cache headers для fingerprinted assets;
* no-cache для `index.html`;
* backend timeouts;
* request ID forwarding.

---

# 8. Образы frontend

## 8.1. `landing-web`

Использовать multi-stage Dockerfile:

1. Node build;
2. Nginx runtime.

Frontend должен собираться с:

```text
VITE_API_BASE_URL=/api
```

или эквивалентным относительным путем.

Не встраивать:

* IP VM;
* database credentials;
* S3 credentials;
* Telegram token;
* Bitrix webhook;
* SMTP credentials.

## 8.2. `w-admin-web`

Собирать с base path:

```text
/admin/
```

React Router должен работать с:

```text
basename="/admin"
```

или эквивалентной конфигурацией.

API:

```text
/api
```

После прямого открытия URL:

```text
/admin/catalog/products
```

Nginx должен возвращать admin `index.html`, а не 404.

## 8.3. Health endpoint

Каждый frontend container должен иметь:

```text
/healthz
```

возвращающий HTTP 200.

---

# 9. Backend test configuration

Backend на стенде должен использовать:

```text
SPRING_PROFILES_ACTIVE=staging
```

Минимальные параметры:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
S3_ENDPOINT
S3_BUCKET
S3_ACCESS_KEY
S3_SECRET_KEY
SMTP_HOST
SMTP_PORT
LEAD_RECIPIENTS
ADMIN_BOOTSTRAP_EMAIL
ADMIN_BOOTSTRAP_PASSWORD
CORS_ALLOWED_ORIGINS
JWT_OR_SESSION_SECRETS
CAROUSEL_MAX_ACTIVE_SLIDES
```

Ни один секрет не должен попадать в Git.

## 9.1. Bootstrap admin

Создать тестового администратора idempotent способом.

Email можно задать конфигурацией.

Пароль:

* генерируется случайно;
* сохраняется только на VM;
* файл с учетными данными имеет mode 600;
* пароль не выводится в GitHub Actions logs;
* пароль не включается в итоговый публичный отчет.

Путь, например:

```text
/home/kitexp/.kitexp-staging-credentials
```

В итоговом отчете указать только команду получения:

```bash
ssh -i ~/.ssh/id_ed25519 kitexp@84.54.56.12 \
  'cat ~/.kitexp-staging-credentials'
```

---

# 10. Тестовые данные

Миграция production S3 ранее была отложена.

Не начинать production migration без отдельного разрешения.

Для стенда обеспечить работающие данные одним из способов:

## Предпочтительный вариант

Использовать idempotent staging seed:

* категория;
* несколько товаров;
* характеристики;
* преимущества;
* галерея;
* video URL;
* новость;
* полезная статья;
* контентные блоки;
* карусельные слайды;
* privacy policy;
* тестовый PDF;
* изображения;
* тестовый admin user.

Медиа seed загружается в MinIO.

Структура тестовых данных должна соответствовать реальным DTO лендинга.

## Допустимый временный источник

Для формирования seed можно использовать:

* локальные JSON проекта;
* `src/data`;
* `src/data_v2`;
* безопасные тестовые изображения;
* локальные фикстуры.

Не объявлять эти данные production source of truth.

## Запрещено

* записывать в production S3;
* удалять production objects;
* изменять production JSON;
* копировать production secrets в GitHub;
* выполнять production migration без подтверждения.

---

# 11. Перевод лендинга на новый API

Не выполнять big-bang rewrite.

Переводить data flow поэтапно.

## 11.1. Общий API client

Реализовать:

* base URL;
* typed OpenAPI client;
* request ID;
* единый error mapping;
* timeout;
* cancellation;
* retry только для безопасных GET;
* loading;
* error;
* empty states.

## 11.2. Карусель

Заменить текущую загрузку S3 JSON на:

```text
GET /api/v1/public/slides?placement=EQUIPMENT_CATALOG
```

Поддержать:

* desktop image;
* mobile image;
* active;
* order;
* actions;
* empty carousel state.

## 11.3. Категории

Заменить локальные и S3-данные на:

```text
GET /api/v1/public/product-categories
```

Не ломать текущую группировку и фильтры.

## 11.4. Товары

Список:

```text
GET /api/v1/public/products
```

Деталь:

```text
GET /api/v1/public/products/{id}
```

Поддержать поиск по:

* UUID;
* `externalId`.

Сохранить:

```text
/equipment/:id
```

## 11.5. Материалы

Список:

```text
GET /api/v1/public/content
```

Деталь:

```text
GET /api/v1/public/news/{id}
```

Сохранить:

```text
/news/:id
```

## 11.6. Privacy policy

Использовать:

```text
GET /api/v1/public/legal/privacy-policy
```

## 11.7. Формы

Удалить browser-side:

* Telegram;
* Telegram widget формы;
* Telegram Bot API;
* Bitrix;
* Bitrix webhook;
* соответствующие `VITE_*` secrets.

Использовать:

```text
POST /api/v1/public/leads
```

Проверить:

* PRODUCT_REQUEST;
* FEEDBACK;
* обязательные поля;
* consent;
* success;
* validation errors;
* network error;
* rate limit.

## 11.8. S3 media

Публичный frontend получает media URL из backend DTO.

Frontend не должен сам конструировать MinIO или S3 object key.

Backend возвращает:

* public media URL;
* либо proxy URL;
* либо безопасный signed URL согласно SDD.

Для публичных изображений стенда предпочтительны стабильные backend-generated public URLs.

---

# 12. CI workflow каждого проекта

## 12.1. Pull Request CI

При PR в `main` запускать:

### Backend

```text
format/lint
unit tests
integration tests
Testcontainers
OpenAPI compatibility
Maven verify
Docker build
```

### React frontend

```text
install with lockfile
lint
typecheck
unit/component tests
build
Docker build
```

### Contracts

```text
OpenAPI lint
OpenAPI validation
breaking-change check
client generation test
```

### Infra

```text
docker compose config
shellcheck
configuration validation
```

PR нельзя merge, если обязательная проверка не прошла.

## 12.2. Main workflow

После merge в `main`:

1. повторить обязательные CI-проверки;
2. собрать Docker image;
3. авторизоваться в GHCR;
4. отправить image с SHA tag;
5. добавить staging tag;
6. вызвать deployment по SSH;
7. дождаться health checks;
8. запустить smoke tests;
9. при ошибке deployment пометить workflow failed;
10. выполнить rollback приложения там, где он безопасен.

---

# 13. Deployment workflow

## 13.1. Общий deployment script

В `w-platform-infra` создать:

```text
bin/deploy-service
```

Аргументы:

```text
service
image
tag
```

Пример:

```bash
deploy-service \
  w-backend-service \
  ghcr.io/<owner>/w-backend-service \
  sha-abc123
```

## 13.2. Serialization

Поскольку разные репозитории могут деплоиться одновременно, использовать на VM:

```bash
flock
```

Например:

```text
/var/lock/kitexp-staging-deploy.lock
```

Только один deployment может изменять Compose state одновременно.

## 13.3. Алгоритм deployment

1. получить lock;
2. проверить свободное место;
3. проверить текущий compose state;
4. сохранить копию `.env`;
5. сохранить текущий image tag;
6. для backend сделать PostgreSQL backup;
7. временно авторизоваться в GHCR;
8. обновить image tag;
9. выполнить `docker compose pull`;
10. выполнить `docker compose up -d --remove-orphans`;
11. дождаться container health;
12. выполнить внутренние health checks;
13. выполнить внешние smoke tests;
14. при успехе сохранить release metadata;
15. удалить временный Docker credential config;
16. освободить lock.

## 13.4. Ошибка deployment

Если новый container не стал healthy:

1. вернуть предыдущий image tag;
2. выполнить `docker compose up -d`;
3. проверить rollback health;
4. сохранить failed release report;
5. завершить workflow с ошибкой.

## 13.5. Миграции базы

Flyway migrations должны быть:

* forward-compatible;
* проверены в CI;
* протестированы через PostgreSQL Testcontainers;
* применяться до готовности backend;
* не удалять данные без отдельной migration strategy.

Перед backend deployment делать `pg_dump`.

Автоматический rollback Docker image не гарантирует rollback схемы.

Если migration изменила схему и smoke tests не прошли:

* deployment считать failed;
* сохранить backup;
* не выполнять автоматический destructive restore без анализа;
* исправить migration или выполнить документированное восстановление;
* повторить deployment.

---

# 14. Backup test stand

## PostgreSQL

Перед backend deployment:

```text
pg_dump custom format
```

Хранить минимум:

```text
7 последних backup
```

## MinIO

На первом этапе:

* persistent Docker volume;
* ежедневный или pre-release архив metadata/test bucket;
* хранить минимум 3 последних backup;
* не считать тестовый стенд production backup solution.

## Cleanup

Настроить:

* очистку старых Docker images;
* очистку dangling layers;
* ограничение логов;
* ротацию backup;
* контроль свободного места.

Не выполнять агрессивный `docker system prune --volumes`.

---

# 15. Безопасность VM

## 15.1. System update

Выполнить:

```bash
sudo apt update
sudo apt upgrade -y
```

Не выполнять upgrade Ubuntu 22.04 → 24.04 в рамках этой задачи.

## 15.2. Docker

Установить Docker Engine из официального репозитория или использовать уже установленную актуальную версию.

Проверить:

```bash
docker version
docker compose version
```

## 15.3. Firewall

Настроить UFW:

```text
allow OpenSSH
allow 80/tcp
allow 443/tcp
deny all other incoming by default
```

Перед включением проверить, что SSH разрешен.

## 15.4. SSH

Не отключать текущий рабочий SSH-доступ.

Не менять SSH port.

Не запрещать пользователя `kitexp`, пока не проверен альтернативный доступ.

Не включать парольный вход, если используется ключ.

## 15.5. Docker access

Если пользователь `kitexp` добавляется в группу `docker`, зафиксировать в security documentation, что эта группа фактически предоставляет административный доступ к host.

---

# 16. Сквозные тесты после deployment

Не считать deployment завершенным только потому, что containers имеют статус `running`.

Все сценарии ниже должны быть протестированы.

## 16.1. Infrastructure

Проверить:

* HTTPS отвечает;
* HTTP redirect работает;
* PostgreSQL healthy;
* MinIO healthy;
* Mailpit healthy;
* backend readiness healthy;
* landing health healthy;
* admin health healthy;
* внутренние порты недоступны извне.

## 16.2. Публичный лендинг

Проверить:

* `/`;
* `/equipment`;
* карточки товаров;
* `/equipment/:id`;
* категории;
* фильтры;
* поиск;
* карусель;
* desktop image;
* mobile image;
* `/information`;
* `/news/:id`;
* `/privacy-policy`;
* 404;
* прямое открытие вложенного URL;
* отсутствие browser console errors;
* отсутствие запросов в Telegram/Bitrix.

## 16.3. Lead form

Проверить:

1. валидная PRODUCT_REQUEST;
2. валидная FEEDBACK;
3. отсутствие обязательного поля;
4. отсутствие consent;
5. невалидный email;
6. невалидный телефон;
7. связь с товаром;
8. запись в PostgreSQL;
9. email в Mailpit;
10. отображение лида в admin.

## 16.4. Admin authentication

Проверить:

* login;
* incorrect password;
* logout;
* session refresh;
* protected route;
* permission denial;
* `ADMIN`;
* `FEATURE_OWNER`;
* `CONTENT_READER`.

## 16.5. Товар

Сквозной сценарий:

1. войти как admin;
2. создать категорию;
3. создать товар;
4. backend генерирует UUID и code;
5. загрузить главное изображение внутри формы;
6. загрузить галерею;
7. добавить характеристики;
8. добавить преимущества;
9. добавить video URL;
10. сохранить;
11. открыть публичную карточку;
12. проверить все данные;
13. отредактировать;
14. проверить обновление на публичном сайте.

## 16.6. Медиатека

Проверить:

* inline upload;
* выбор существующего media;
* поиск;
* фильтр по товару;
* usages;
* safe delete;
* metadata editing;
* file replacement с сохранением UUID;
* CONTENT_READER read-only.

## 16.7. Карусель

Проверить:

* создать слайд;
* desktop image;
* mobile image;
* action;
* active;
* order;
* backend limit;
* отображение на лендинге.

## 16.8. Материал

Проверить:

* создать NEWS;
* создать ARTICLE;
* content blocks;
* cover;
* image block;
* существующий ID route;
* публичное отображение;
* редактирование.

## 16.9. Privacy policy

Проверить:

* draft;
* active;
* SEO;
* OG image;
* public response;
* публичную страницу.

---

# 17. Playwright E2E

Добавить отдельный набор E2E-тестов.

Допустимо разместить:

* в `w-platform-infra/e2e`;
* либо в отдельной общей test-папке;
* либо в admin/public frontend, если это соответствует SDD.

Тесты должны запускаться:

1. локально против Docker Compose;
2. после staging deployment против VM.

Для staging:

* использовать отдельного E2E admin;
* создавать сущности с уникальным префиксом;
* сохранять созданные UUID;
* после теста архивировать или удалять тестовые сущности;
* не использовать production данные;
* прикладывать screenshots и traces при падении.

---

# 18. Критерии приемки CI/CD

CI/CD считается готовым, если:

1. каждый deployable проект находится в GitHub;
2. PR запускает CI;
3. красный CI блокирует merge;
4. `main` собирает Docker image;
5. image публикуется в GHCR;
6. deployment выполняется по SSH;
7. host key проверяется;
8. secrets не выводятся в logs;
9. deployment сериализован через lock;
10. сервисы используют immutable image tags;
11. health checks выполняются;
12. smoke tests выполняются;
13. неуспешный container deployment откатывается;
14. PostgreSQL backup создается перед backend deployment;
15. commit SHA развернутой версии можно определить;
16. весь deployment можно повторить;
17. после перезагрузки VM стенд запускается автоматически;
18. домены `kitexp.ru` и `kitexp.ru.ru` не изменены.

---

# 19. Критерии полной приемки стенда

Работа считается завершенной только при одновременном выполнении условий:

## Infrastructure

* VM настроена;
* Docker установлен;
* firewall настроен;
* reverse proxy работает;
* self-signed HTTPS работает;
* PostgreSQL работает;
* MinIO работает;
* Mailpit работает;
* persistent volumes работают.

## Backend

* backend запущен;
* Flyway migrations применены;
* health green;
* auth работает;
* RBAC работает;
* catalog работает;
* media работает;
* carousel работает;
* content работает;
* privacy policy работает;
* leads работают;
* email delivery работает.

## Admin

* admin открывается;
* login работает;
* роли работают;
* товары создаются;
* media загружается из формы;
* media выбирается из библиотеки;
* media фильтруется по товару;
* carousel редактируется;
* content редактируется;
* privacy policy редактируется;
* leads отображаются.

## Landing

* landing открыт на тестовом IP;
* данные поступают из backend;
* изображения поступают из test S3/MinIO;
* товарные страницы работают;
* news routes работают;
* carousel работает;
* lead forms работают;
* Telegram и Bitrix удалены;
* browser console не содержит критических ошибок.

## Testing

* backend tests green;
* frontend tests green;
* OpenAPI validation green;
* Docker builds green;
* smoke tests green;
* Playwright critical tests green;
* staging post-deploy tests green.

Не завершать работу со статусом `COMPLETED`, пока остается хотя бы один падающий критический тест.

---

# 20. Работа с ошибками

При обнаружении ошибки:

1. зафиксировать симптом;
2. сохранить logs;
3. определить проект-владелец;
4. создать отдельную задачу;
5. исправить локально;
6. добавить regression test;
7. выполнить commit;
8. push feature branch;
9. дождаться CI;
10. merge;
11. повторить deployment;
12. повторить полный затронутый test suite.

Не отключать тест только ради зеленого pipeline.

Не заменять строгую проверку пустым mock.

Не скрывать ошибку обработчиком, если причина не устранена.

---

# 21. Документация, которую необходимо создать

## В `w-platform-infra`

```text
docs/
├── STAGING_ARCHITECTURE.md
├── VM_BOOTSTRAP.md
├── GITHUB_ACTIONS.md
├── GHCR.md
├── DEPLOYMENT.md
├── ROLLBACK.md
├── BACKUP_AND_RESTORE.md
├── SECRETS.md
├── NETWORKING.md
├── TLS_TEST_STAND.md
├── OPERATIONS.md
├── TROUBLESHOOTING.md
├── ACCEPTANCE_REPORT.md
└── DEPLOYED_VERSIONS.md
```

## На VM

Создать:

```text
/opt/kitexp-staging/README.md
/opt/kitexp-staging/DEPLOYMENT_STATE.md
```

## В каждом проекте

Обновить:

```text
README.md
docs/sdd/
docs/implementation/PROGRESS.md
docs/implementation/TEST_RESULTS.md
docs/implementation/DEVIATIONS.md
```

---

# 22. Итоговый отчет

После успешного завершения предоставить:

## 22.1. Архитектура

* фактически развернутые сервисы;
* routing;
* ports;
* volumes;
* networks;
* data stores.

## 22.2. GitHub

Таблица:

| Repository | Branch | Latest commit | Workflow | GHCR image |
| ---------- | ------ | ------------- | -------- | ---------- |

## 22.3. VM

* установленные компоненты;
* system services;
* firewall;
* Docker version;
* Compose version;
* свободное место;
* расположение стенда.

## 22.4. URLs

```text
Landing
Admin
API health
```

Не публиковать учетные данные в отчете.

Указать безопасную команду получения локального staging admin password.

## 22.5. Deployment

* workflow run IDs;
* deployed image SHA tags;
* deployment date;
* backup status;
* health status.

## 22.6. Tests

Таблица:

| Project | Test suite | Result |
| ------- | ---------- | ------ |

## 22.7. Acceptance scenarios

Для каждого сценария:

```text
PASSED
FAILED
BLOCKED
```

При наличии `FAILED` итоговый статус не может быть `COMPLETED`.

## 22.8. Остаточные ограничения

Указывать только реальные некритические ограничения.

## 22.9. Итоговый статус

Использовать только:

```text
COMPLETED
NOT_COMPLETED
```

`COMPLETED` допустим только при полностью работающем стенде и зеленых критических тестах.

---

# 23. Порядок начала работы

Начни со следующего:

```bash
cd /home/dds/dev/stanley-co
```

Затем:

1. проверить все локальные репозитории;
2. проверить актуальные SDD и ADR;
3. проверить `gh auth status`;
4. проверить существующие GitHub remotes;
5. проверить локальную сборку каждого проекта;
6. проверить SSH к VM;
7. выполнить read-only аудит VM;
8. зафиксировать deployment architecture;
9. обновить SDD и ADR по CI/CD;
10. создать или подключить GitHub-репозитории;
11. настроить PR CI;
12. подготовить `w-platform-infra`;
13. bootstrap VM;
14. развернуть data stores;
15. развернуть backend;
16. развернуть admin;
17. перевести и развернуть landing;
18. заполнить test seed;
19. провести сквозные тесты;
20. исправлять ошибки до полного прохождения приемки.

Работай автономно и поэтапно.

Не останавливайся после создания CI-файлов.

Конечный результат — фактически работающий тестовый стенд по адресу `84.54.56.12`.
