# Module Boundaries

Modules:

- `auth`, `user`, `rbac`;
- `catalog`, `content`, `page`, `legacy`, `menu`, `slide`, `contact`;
- `media`, `document`, `certificate`, `storage`;
- `lead`, `notification`;
- `setting`, `audit`, `migration`, `common`.

Rules:

- controllers call application services only;
- services own validation and transactions;
- repositories are module-private;
- cross-module links by IDs or published application services;
- all admin writes call audit.

