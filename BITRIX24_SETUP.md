# Настройка формы обратной связи с Bitrix24

## Быстрый старт

### 1. Создание вебхука в Bitrix24

1. Откройте Bitrix24 → **Приложения** → **Входящий вебхук**
2. Создайте вебхук с правами **CRM: Лиды**
3. Скопируйте URL вебхука

### 2. Локальная разработка

Создайте файл `.env.local` в корне проекта:

```env
VITE_BITRIX_WEBHOOK_URL=https://your-domain.bitrix24.ru/rest/1/your_webhook_key/crm.lead.add.json
VITE_BITRIX_DEMO_MODE=true
VITE_FORM_DISABLED=false
```

Перезапустите dev-сервер: `npm run dev`

### 3. Production (деплой)

Настройте переменные в **GitHub Secrets** (Settings → Secrets and variables → Actions):

- `VITE_BITRIX_WEBHOOK_URL` - URL вебхука
- `VITE_BITRIX_DEMO_MODE` - `false`
- `VITE_FORM_DISABLED` - `false`

**Подробная инструкция:** см. `DEPLOY.md`

---

## Настройки

| Переменная | Описание | Значения |
|------------|----------|----------|
| `VITE_BITRIX_WEBHOOK_URL` | URL вебхука Bitrix24 | `https://domain.bitrix24.ru/rest/1/key/crm.lead.add.json` |
| `VITE_BITRIX_DEMO_MODE` | Демо-режим (не отправляет запросы) | `true` / `false` |
| `VITE_FORM_DISABLED` | Полностью скрыть форму | `true` / `false` |

---

## Формат данных

Форма отправляет в Bitrix24:
- Название компании → `COMPANY_TITLE`, `TITLE`
- Имя, Отчество, Фамилия → `NAME`, `SECOND_NAME`, `LAST_NAME`
- Телефон → `PHONE`
- Комментарий → `COMMENTS`
- Автоматически: источник "WEB", статус "NEW"

---

## Обработка ошибок

Форма автоматически различает типы ошибок и показывает понятные сообщения:

- **CORS ошибка** - обычно только на localhost, на production не возникает
- **Сетевая ошибка** - проблемы с интернетом
- **Ошибка Bitrix24** - проблемы с API или настройками
- **Таймаут** - сервер не отвечает (30 сек)

Все ошибки детально логируются в консоль браузера.

---

## Устранение проблем

**Форма не отправляется:**
- Проверьте консоль браузера (F12)
- Убедитесь, что webhook URL правильный
- Проверьте, что `VITE_BITRIX_DEMO_MODE=false`

**CORS ошибка на localhost:**
- Это нормально для локальной разработки
- Проверьте на production сервере

**Переменные не читаются:**
- Убедитесь, что файл `.env.local` в корне проекта
- Перезапустите dev-сервер
- Проверьте, что переменные начинаются с `VITE_`

---

## Дополнительно

- [Документация Bitrix24 REST API](https://apidocs.bitrix24.ru/api-reference/crm/leads/crm-lead-add.html)
- Шаблон конфигурации: `env.example`
