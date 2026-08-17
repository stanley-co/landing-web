# Admin preview boundary

Landing owns `/preview/admin` and renders its existing article/product presentation components from ephemeral Admin draft messages. It does not fetch an Admin-only public representation and does not alter production public data routes.

The route only accepts messages from the exact `VITE_ADMIN_PREVIEW_ORIGIN`; without that configuration it is disabled. Admin frames must target `VITE_LANDING_PREVIEW_URL`, validate the frame origin/readiness, and send drafts only after it is ready. Missing media renders a non-fatal placeholder. Production public APIs continue to expose only active content, products, and slides.
