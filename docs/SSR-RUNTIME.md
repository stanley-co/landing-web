# SSR runtime contract

The landing image runs Node on port 80. Detail requests are rendered only for UUID routes
`/equipment/{id}` and `/news/{id}`. The renderer reads the backend public detail endpoint and
`/public/site-policy`; it never infers an identity from the incoming Host header.

Set `PUBLIC_API_BASE_URL` to the backend's internal `/api/v1` base URL. The backend must return
the approved projection DTO with `approvedVersion` and `publishedAt`, and a policy response with
an HTTPS `canonicalBaseUrl` plus `indexingEnabled`. Detail documents and 404s are `no-store`.

The document serializes its approved DTO in `window.__DETAIL_BOOTSTRAP__`. The browser consumes
that value during hydration before it considers an API read, preventing an unversioned first-load
replacement. A missing approved projection remains a terminal 404.
