# Status Model

Managed content statuses:

- `DRAFT`: not visible in public API.
- `ACTIVE`: visible in public API.
- `ARCHIVED`: hidden from public API, retained for history/recovery.

Simple lookup entities may use `active: boolean` only when no draft/archive semantics are needed, for example social links or contact rows.

No scheduled publication in MVP.

