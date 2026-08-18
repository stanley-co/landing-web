# Notifications

Interface:

```java
public interface NotificationSender {
    NotificationResult send(NotificationMessage message);
}
```

MVP implementation: `EmailNotificationSender` using Spring Mail/SMTP.

Local: Mailpit/MailHog.

Telegram: `TelegramNotificationSender` stub, disabled by default, logs and returns `DISABLED` or `SKIPPED`.

Bitrix: no MVP adapter; future extension point only.

