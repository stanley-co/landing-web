# Login Screen

Route: `/login`. Roles: unauthenticated.

Endpoint: `POST /api/v1/auth/login`, `GET /api/v1/auth/me`.

Fields: email, password. Validation: required, email format.

States: loading submit, invalid credentials, locked account.

Acceptance: successful login redirects to dashboard; 401 shows safe message.

