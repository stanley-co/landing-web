# Error Model

All APIs return:

```json
{
  "timestamp": "2026-07-15T12:00:00Z",
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "Некорректные данные",
  "fields": {
    "email": "Некорректный адрес электронной почты"
  },
  "requestId": "request-id"
}
```

Status codes:

- `400` validation or bad request;
- `401` unauthenticated;
- `403` forbidden;
- `404` not found;
- `409` conflict, duplicate ID/version conflict;
- `413` upload too large;
- `415` unsupported media type;
- `422` business rule violation;
- `429` rate limit;
- `500` internal error without stack trace.

