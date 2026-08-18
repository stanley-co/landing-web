# Security

- Remove Telegram bot token and Bitrix webhook from frontend.
- Frontend only sends lead data to backend.
- Do not store admin tokens in public frontend.
- Public API base URL via `VITE_API_BASE_URL`.
- Sanitize rendered rich content if backend sends HTML. Prefer structured blocks.
- External links must use `rel="noopener noreferrer"`.

