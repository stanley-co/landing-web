# Задача: декомпозиция документации FKIT по репозиториям + настройка Landing Web как orchestration/control point

Ты работаешь внутри существующего проекта **FKIT**.

Сейчас основной исторический репозиторий `landing web` содержит большое количество документации, SDD, архитектурных описаний и контекста не только про сам landing, но и про другие сервисы системы.

Это исторически сложившаяся структура и теперь ее необходимо исправить.

## Главная цель

Необходимо:

1. Полностью исследовать текущий `landing web`.
2. Найти всю существующую проектную документацию:

   * SDD;
   * architecture;
   * API;
   * backend;
   * admin;
   * landing;
   * S3;
   * deployment;
   * CI/CD;
   * infrastructure;
   * database;
   * integration;
   * product requirements;
   * технические решения;
   * deprecated/legacy решения;
   * инструкции для AI-агентов;
   * любые другие документы, относящиеся к системе.
3. Определить, какому реальному сервису / модулю / Git-репозиторию принадлежит каждый документ.
4. Перенести ownership актуальной документации в соответствующие репозитории.
5. Для каждого существующего репозитория выполнить BMAD onboarding / project context.
6. Старую документацию из `landing web`, которая больше не является source of truth, не удалять бесследно, а архивировать в `docs/deprecated`.
7. При этом **НЕ потерять возможность управлять всей системой из `landing web`**.

После выполнения задачи `landing web` должен стать **центральной точкой orchestration системы**, но не хранилищем внутренней документации всех сервисов.

---

# ВАЖНО: сначала исследование, потом изменения

Не начинай механически переносить Markdown-файлы.

Сначала полностью исследуй существующее состояние.

Нужно установить:

* какие Git-репозитории существуют;
* какие из них находятся локально;
* какие remotes настроены;
* какие сервисы реально существуют;
* какие сервисы были запланированы, но не реализованы;
* какие сервисы переименовывались;
* где сейчас фактически находится backend;
* где admin web;
* где landing web;
* где infrastructure / deployment;
* есть ли API Gateway;
* какие базы данных используются;
* какие S3-интеграции существуют;
* какие CI/CD workflows существуют;
* какие контракты реально используются;
* какие документы устарели;
* какие документы конфликтуют с реализацией.

**Код, конфигурация, Git history и существующие deployment/configuration files имеют больший приоритет, чем старая документация.**

Если SDD говорит одно, а код уже реализован иначе — актуальной считается фактическая реализация.

---

# Работа с Git

Определи все связанные repositories через:

* локальную структуру workspace;
* `.git`;
* `git remote -v`;
* ссылки внутри документации;
* CI/CD workflows;
* Docker Compose;
* deployment scripts;
* package manifests;
* backend configuration;
* Git history.

Не используй абсолютные machine-specific пути в документации.

Если связанные репозитории находятся рядом с `landing web`, зафиксируй логическую связь между ними.

Если какой-либо репозиторий известен через Git remote, но отсутствует локально, и у тебя есть доступ — можешь получить его в workspace.

Не создавай новый репозиторий, если соответствующий repository уже существует.

---

# Git safety

Перед изменением каждого repository:

1. Выполни:

```bash
git status
git branch --show-current
git remote -v
git log --oneline -20
```

2. Не уничтожай существующие пользовательские изменения.
3. Не делай `git reset --hard`.
4. Не переписывай историю.
5. Не force push.
6. Не смешивай изменения разных repositories в один commit.
7. Документационные изменения каждого repository должны иметь собственный commit.

Если необходимо создать отдельную ветку, используй общий feature branch вроде:

```text
docs/bmad-documentation-restructure
```

Feature branch не должна запускать production deployment.

---

# BMAD — обязательное требование

Не имитируй BMAD вручную.

Ты обязан реально использовать установленный BMAD.

Сначала выясни доступную версию и команды:

```bash
bmad-help
```

или эквивалентный вызов BMAD, доступный в текущем окружении.

Для каждого существующего repository необходимо выполнить актуальный BMAD workflow для existing/brownfield project.

Предпочтительно:

```bash
bmad-project-context
```

Если установленная версия BMAD использует другое актуальное название команды — используй актуальный эквивалент.

Не используй deprecated workflow только потому, что старый SDD упоминает его.

В частности, если установленный BMAD сообщает, что:

```text
bmad-document-project
```

deprecated и перенаправляет на новый workflow — используй современный workflow.

---

# Что должен сделать BMAD в каждом repository

BMAD должен помочь сформировать или актуализировать:

```text
AGENTS.md
```

для конкретного repository.

Контекст должен основываться не только на документации, но и на фактическом коде.

Для каждого repo BMAD должен понимать:

* назначение repository;
* его ответственность;
* границы ответственности;
* важные архитектурные ограничения;
* build/test команды;
* особенности запуска;
* правила разработки;
* интеграции;
* cross-service contracts;
* deployment constraints;
* branch policy;
* особенности, которые AI-агент не сможет очевидно вывести только из кода.

Не засоряй `AGENTS.md` огромным пересказом всего проекта.

В нем должны быть прежде всего правила, ограничения, ownership и ссылки на необходимые документы.

---

# Целевая архитектура документации

После миграции документация должна следовать принципу:

> Documentation lives with the code that owns the behavior.

То есть backend-документация принадлежит backend repository.

Admin documentation принадлежит admin repository.

Landing documentation принадлежит landing repository.

Infrastructure documentation принадлежит infrastructure/deployment repository, если такой существует.

И так далее.

---

# Пример структуры отдельного repository

Не копируй структуру слепо — адаптируй под фактическое содержимое.

Например:

```text
repository/
├── AGENTS.md
├── README.md
└── docs/
    ├── README.md
    ├── architecture.md
    ├── development.md
    ├── integration.md
    ├── api.md
    ├── data-model.md
    ├── deployment.md
    ├── decisions/
    │   └── ...
    └── deprecated/
        └── ...
```

Создавай только действительно нужные файлы.

Не создавай пустую документацию ради структуры.

---

# Source of Truth

Для каждого направления должен существовать **ровно один основной source of truth**.

Например:

### Backend

Backend repository является source of truth для:

* backend architecture;
* application services;
* DB schema;
* migrations;
* backend configuration;
* backend business logic;
* backend API implementation;
* S3 backend integration;
* backend security;
* backend testing.

### Admin Web

Admin repository является source of truth для:

* admin architecture;
* UI structure;
* forms;
* admin API client;
* roles UI;
* admin UX;
* component structure;
* frontend-specific contracts.

### Landing Web

Landing repository является source of truth для:

* landing architecture;
* routes;
* SEO;
* public pages;
* frontend rendering;
* landing API consumption;
* forms on landing;
* landing-specific behavior.

### Infrastructure / deployment

Соответствующий repository является source of truth для:

* Docker;
* environments;
* deployment;
* CI/CD;
* VM configuration;
* reverse proxy;
* GitHub Actions;
* runtime topology.

Если отдельного repository для infrastructure сейчас нет — не создавай его автоматически.

Определи наиболее логичного существующего владельца и зафиксируй решение.

---

# Особое правило для API-контрактов

Не создавай несколько независимых копий одного API-контракта.

Определи provider / owner контракта.

Например, если backend предоставляет API:

backend repository является source of truth для полного API contract.

Consumer repositories могут содержать:

* ссылку на контракт;
* описание особенностей использования;
* frontend-specific integration notes.

Но не должны иметь отдельную несовместимую копию API specification.

---

# Работа со старой документацией Landing Web

Существующая документация не должна исчезнуть.

Создай:

```text
docs/deprecated/
```

или логически аналогичную структуру.

Перемести туда старые документы, которые:

* исторически находились в landing;
* больше не являются source of truth;
* были заменены документацией конкретных repositories;
* содержат старую архитектуру;
* содержат устаревший SDD;
* относятся к завершенной миграции.

При необходимости используй структуру:

```text
docs/deprecated/
├── README.md
├── legacy-sdd/
├── legacy-architecture/
├── legacy-backend/
├── legacy-admin/
└── legacy-infrastructure/
```

В:

```text
docs/deprecated/README.md
```

обязательно объясни:

* почему эти документы архивированы;
* что они не являются source of truth;
* где находятся актуальные документы;
* для каких целей legacy docs еще могут использоваться.

---

# КРИТИЧЕСКОЕ ТРЕБОВАНИЕ: Landing Web остается точкой управления всей системой

Это самая важная часть задачи.

После разделения документации я всё равно хочу иметь возможность открыть AI-агента **в repository `landing web`** и написать, например:

> Добавь новое поле карточки товара.

или:

> Измени способ загрузки изображения.

или:

> Добавь новую сущность в админку и backend.

или:

> Измени API и переведи landing + admin на новый контракт.

И агент, начиная работу именно из `landing web`, должен понимать:

1. какие repositories затрагивает изменение;
2. где они располагаются;
3. как связаны;
4. какой repository отвечает за конкретную часть;
5. какие `AGENTS.md` необходимо прочитать;
6. какие API contracts затрагиваются;
7. в каких repositories необходимо сделать изменения;
8. какие тесты выполнить;
9. какие commits сделать.

Поэтому `landing web` превращается в **system orchestration repository / control point**.

---

# Что необходимо оставить / создать в Landing Web

В `landing web` должна остаться только документация верхнего уровня.

Пример:

```text
landing-web/
├── AGENTS.md
├── README.md
└── docs/
    ├── system/
    │   ├── README.md
    │   ├── repositories.md
    │   ├── architecture-overview.md
    │   ├── dependencies.md
    │   ├── change-routing.md
    │   └── contracts.md
    │
    └── deprecated/
        └── ...
```

Названия можешь улучшить, если найдешь более подходящую структуру.

---

# docs/system/repositories.md

Создай реестр всех repositories системы.

Для каждого repository укажи:

* canonical name;
* назначение;
* Git remote;
* ответственность;
* основные технологии;
* source-of-truth documentation;
* какие другие repositories являются consumers/providers;
* какие типы изменений обычно требуют изменения этого repo.

Не используй абсолютные локальные пути.

---

# Machine-readable repository manifest

Помимо Markdown необходимо создать machine-readable manifest.

Например:

```text
.project/repositories.yaml
```

или другое подходящее название.

Пример концепции:

```yaml
repositories:

  landing-web:
    role: public-frontend
    remote: ...
    local_hint: ../landing-web
    docs: docs/
    agent_context: AGENTS.md

  backend:
    role: backend
    remote: ...
    local_hint: ../backend
    docs: docs/
    agent_context: AGENTS.md

  admin-web:
    role: admin-frontend
    remote: ...
    local_hint: ../admin-web
    docs: docs/
    agent_context: AGENTS.md
```

Фактические repository names и пути необходимо получить из проекта.

Не придумывай их.

`local_hint` должен быть относительным и необязательным.

Remote должен позволять агенту идентифицировать repository даже если локальная структура workspace отличается.

Никаких credentials / tokens / passwords туда записывать нельзя.

---

# dependency map

Создай system dependency map.

Необходимо определить реальные связи вроде:

```text
Landing Web
    ↓
Backend API
    ↓
PostgreSQL
    ↓
S3
```

и:

```text
Admin Web
    ↓
Backend API
```

и другие фактические связи проекта.

Не ограничивайся этим примером.

Исследуй проект.

Зафиксируй:

* provider;
* consumer;
* contract;
* direction;
* ownership.

---

# change-routing.md

Это один из самых важных документов.

Он должен помогать AI-агенту определить scope изменения.

Например:

```text
Изменение backend DTO
→ backend
→ проверить admin
→ проверить landing
→ проверить API documentation

Изменение admin-only UI
→ admin repository

Изменение public SEO
→ landing repository

Изменение DB schema
→ backend
→ migrations
→ API impact analysis
→ consumers analysis

Изменение deployment
→ infrastructure/deployment owner
```

Составь routing matrix на основании реальной архитектуры.

---

# AGENTS.md в Landing Web

Root `AGENTS.md` должен явно сообщать AI-агенту:

> Этот repository является не только public frontend, но также primary entry point для управления FKIT system.

Если запрос пользователя касается всей системы или потенциально затрагивает другой компонент, агент НЕ должен ограничиваться текущим repository.

Добавь Cross-Repository Change Protocol.

Пример логики:

## Cross-Repository Change Protocol

При получении задачи:

### 1. Classify

Определи тип изменения:

* landing-only;
* admin-only;
* backend-only;
* infrastructure-only;
* cross-service.

### 2. Resolve repositories

Прочитай:

```text
.project/repositories.yaml
docs/system/repositories.md
docs/system/dependencies.md
docs/system/change-routing.md
```

### 3. Load local context

Для каждого затрагиваемого repository сначала прочитай его:

```text
AGENTS.md
```

и relevant docs.

### 4. Impact analysis

Перед изменением общего контракта найди всех consumers.

### 5. Implement

Изменяй код непосредственно в repository, которому он принадлежит.

Не копируй backend-код в landing.

Не реализуй admin change в landing.

### 6. Validate

Запусти тесты отдельно для каждого измененного repository.

### 7. Documentation

Обновляй documentation source of truth именно в repository-владельце.

### 8. Commit

Создавай отдельный commit внутри каждого repository.

---

# Cross-repository contract rule

При любом изменении:

* API;
* DTO;
* event;
* database-related interface;
* shared media format;
* S3 path convention;
* auth;
* role model;

агент обязан выполнить impact analysis по зависимым repositories.

Запрещено менять provider contract и не проверить consumers.

---

# System-level architecture

В `landing web` должна находиться **только архитектура уровня системы**.

Например:

```text
User
 ↓
Landing Web
 ↓
Backend
 ↓
DB / S3

Administrator
 ↓
Admin Web
 ↓
Backend
```

Но внутренняя архитектура backend не должна полностью дублироваться здесь.

Вместо этого должна быть ссылка:

```text
Backend internals:
<backend repository>/docs/architecture.md
```

---

# Не допускай duplication

После миграции проверь документацию на дублирование.

Если одинаковая информация находится в нескольких repositories:

1. Определи owner.
2. Оставь полную информацию у owner.
3. В остальных местах оставь ссылку + необходимый consumer-specific context.

Особенно внимательно:

* API;
* database;
* DTO;
* S3;
* deployment;
* roles;
* entity definitions;
* CI/CD.

---

# Проверка документации против кода

Каждый важный документ перед переносом необходимо проверить.

Используй:

* code search;
* git history;
* package manifests;
* Maven/Gradle config;
* Docker;
* Compose;
* GitHub Actions;
* environment examples;
* routes;
* controllers;
* DTO;
* migrations;
* React routing;
* API clients.

Документация должна описывать существующую систему, а не прошлое состояние.

---

# SDD

Существующие SDD необходимо классифицировать.

Для каждого SDD определить:

```text
CURRENT
SUPERSEDED
HISTORICAL
PARTIALLY_VALID
```

### CURRENT

Перенести / адаптировать в repository-владельца.

### PARTIALLY_VALID

Проверить против кода.

Актуальные части перенести.

Историческую версию сохранить в deprecated.

### SUPERSEDED / HISTORICAL

Поместить в:

```text
docs/deprecated/
```

Не использовать как source of truth.

---

# Architecture decisions

Если во время миграции обнаружится неоднозначное архитектурное решение, которое нельзя вывести из существующего кода или предыдущих решений:

НЕ принимай крупное архитектурное решение молча.

Используй соответствующий BMAD architecture workflow, например:

```bash
bmad-architecture
```

или актуальный эквивалент установленной версии.

Зафиксируй решение как ADR или другим принятым в проекте способом.

---

# README каждого repository

Проверь README.

После изменений новый разработчик или AI-agent должен быстро понимать:

* что делает repository;
* как его запустить;
* где documentation;
* где `AGENTS.md`;
* какие основные dependencies;
* где находится system-level documentation.

Для non-landing repositories желательно добавить ссылку обратно на system orchestration docs в `landing web`.

Таким образом связь должна быть **двунаправленной**:

```text
Landing
→ знает обо всех repositories

Backend
→ знает, где находится system-level context

Admin
→ знает, где находится system-level context
```

---

# Важная концепция

Необходимо добиться модели:

```text
                   LANDING WEB
             System Control Point
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
     Backend      Admin Web     Infra
        │            │            │
    AGENTS.md     AGENTS.md     AGENTS.md
    docs/         docs/         docs/
```

Но:

```text
landing web
```

НЕ становится monorepo.

Repositories остаются независимыми Git repositories.

`landing web` лишь хранит карту системы и правила orchestration.

---

# Работа агента из Landing Web после миграции

Проверь следующий сценарий.

Представь, что после завершения задачи пользователь запускает AI-агента только в:

```text
landing web
```

и пишет:

> Необходимо добавить в товар поле manufacturer, редактирование в admin и отображение на landing.

Агент должен суметь самостоятельно определить примерно такой workflow:

```text
1. Landing AGENTS.md
2. repository manifest
3. impact analysis

Affected repositories:
- backend
- admin web
- landing web

4. Backend AGENTS.md
5. Backend implementation
6. Backend tests
7. Backend commit

8. Admin AGENTS.md
9. Admin implementation
10. Admin tests
11. Admin commit

12. Landing AGENTS.md
13. Landing implementation
14. Landing tests
15. Landing commit

16. Проверка API compatibility
17. Финальный отчет
```

Если после твоей миграции такой сценарий невозможен — задача не выполнена.

---

# Commits

После окончания изменений в каждом repository должен быть отдельный осмысленный commit.

Например:

```text
docs: establish BMAD project context and repository documentation
```

для service repositories.

Для landing:

```text
docs: establish cross-repository system orchestration
```

Не используй один generic commit на все repositories.

В финальном отчете покажи commit hash каждого repo.

---

# Перед commit

Для каждого repository:

```bash
git diff
git status
```

Проверь:

* нет случайных файлов;
* нет credentials;
* нет local absolute paths;
* нет IDE-specific мусора;
* нет duplicated documentation;
* Markdown links корректны.

---

# Финальная валидация

После миграции выполни полный audit.

## Repository audit

Для каждого repository:

* [ ] существует понятный README;
* [ ] создан/актуализирован BMAD context;
* [ ] есть `AGENTS.md`;
* [ ] documentation соответствует ownership;
* [ ] нет документации чужого сервиса;
* [ ] internal docs не дублируются в landing;
* [ ] git working tree корректен;
* [ ] создан commit.

## Landing audit

* [ ] landing остается полноценным frontend repository;
* [ ] landing содержит system-level architecture;
* [ ] существует repository registry;
* [ ] существует machine-readable repository manifest;
* [ ] существует dependency map;
* [ ] существует change-routing;
* [ ] AGENTS.md содержит cross-repository protocol;
* [ ] agent способен определить другие repositories;
* [ ] старые документы сохранены в deprecated;
* [ ] актуальные service docs больше не принадлежат landing.

## Cross-repository audit

* [ ] repositories ссылаются на system-level documentation;
* [ ] landing ссылается на documentation каждого repository;
* [ ] отсутствуют конфликтующие sources of truth;
* [ ] API ownership однозначен;
* [ ] deployment ownership однозначен;
* [ ] database ownership однозначен;
* [ ] S3 ownership однозначен.

---

# Не делай

Запрещено:

* просто скопировать все docs во все repositories;
* оставить полноценную копию backend SDD в landing;
* оставить несколько API sources of truth;
* удалить исторические документы без архивации;
* придумывать repositories, которых не существует;
* менять application behavior в рамках этой задачи без необходимости;
* выполнять рефакторинг production-кода только ради документации;
* записывать credentials;
* использовать абсолютные пути конкретной машины;
* изменять Git history;
* делать force push;
* считать старый SDD более надежным источником, чем существующий код.

---

# Приоритет источников

При конфликте информации используй следующий порядок:

```text
1. Реально работающий production/test implementation
2. Application code
3. Tests
4. Infrastructure/configuration
5. Git history
6. Актуальные BMAD artifacts
7. Актуальная documentation
8. Старые SDD / legacy docs
```

---

# Итоговый отчет

После завершения работы предоставь подробный отчет.

## 1. Обнаруженная архитектура

Перечисли все найденные repositories:

```text
Repository
Responsibility
Remote
Current branch
Documentation ownership
```

## 2. Что было в Landing

Какая документация была найдена.

## 3. Migration map

В формате:

```text
OLD:
landing/docs/...

NEW:
backend/docs/...

STATUS:
migrated / deprecated / merged / removed-duplicate
```

## 4. BMAD

Для каждого repository:

```text
Repository:
BMAD command:
AGENTS.md:
Context status:
```

## 5. Deprecated

Какие документы были перенесены в deprecated и почему.

## 6. System orchestration

Покажи, какие механизмы теперь позволяют управлять всей системой из `landing web`.

## 7. Git commits

Например:

```text
landing-web
<hash> docs: establish cross-repository system orchestration

backend
<hash> docs: establish BMAD project context

admin-web
<hash> docs: establish BMAD project context
```

Используй реальные repository names и реальные hashes.

## 8. Найденные проблемы

Отдельно перечисли:

* конфликтующие SDD;
* устаревшие contracts;
* undocumented dependencies;
* dead documentation;
* архитектурные расхождения;
* потенциальные технические долги.

---

# Критерий приемки

Задача считается выполненной только если одновременно выполняются оба условия.

### Условие A — Documentation ownership

Каждый repository сам хранит актуальную документацию своей области ответственности и BMAD agent context.

### Условие B — Central orchestration

Я могу открыть AI-agent **только из `landing web`**, дать ему задачу уровня всего FKIT-проекта, и агент самостоятельно:

* определит затронутые repositories;
* найдет их;
* прочитает локальный BMAD context каждого;
* внесет изменения непосредственно в соответствующие repositories;
* проверит интеграции;
* выполнит tests;
* создаст отдельные commits.

Именно эта модель является целевой.

Приступай с полного анализа `landing web`, Git history, текущих SDD и всех связанных repositories. Не начинай миграцию до построения inventory и ownership map.
