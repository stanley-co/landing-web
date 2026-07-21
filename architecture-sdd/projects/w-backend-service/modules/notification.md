# notification Module

Purpose: lead notifications.

Scope: `NotificationSender`, email, SMTP, Mailpit local, retry, delivery status, event log, Telegram stub, future adapters.

Entities/tables: `notification_events`.

Services: `NotificationService`, `EmailNotificationSender`, `TelegramNotificationSender`.

Telegram: disabled by default, no real HTTP, returns `DISABLED`/`SKIPPED`.

Tests: email success/failure, retry, telegram disabled.

