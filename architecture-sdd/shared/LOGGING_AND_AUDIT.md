# Logging And Audit

Backend logs:

- JSON structured logs;
- request ID;
- method, path, status, latency;
- user ID if authenticated;
- no secrets, no raw tokens, no SMTP credentials.

Audit log:

- actor ID;
- action;
- entity type/id;
- old value summary;
- new value summary;
- IP/user-agent;
- timestamp;
- request ID.

Audited operations: login/logout, admin create/update/archive/restore/delete, file upload/replace/delete, lead status change, email retry, settings changes.

