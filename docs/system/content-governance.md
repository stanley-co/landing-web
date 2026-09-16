# Admin preview boundary

Landing owns `/preview/admin` and renders its existing article/product presentation components from ephemeral Admin draft messages. It does not fetch an Admin-only public representation and does not alter production public data routes.

The route only accepts messages from the exact `VITE_ADMIN_PREVIEW_ORIGIN`; without that configuration it is disabled. Admin frames must target `VITE_LANDING_PREVIEW_URL`, validate the frame origin/readiness, and send drafts only after it is ready. Missing media renders a non-fatal placeholder. Production public APIs continue to expose only active content, products, and slides.

## Environment configuration

Each deployed stand is configured as an Admin/landing pair: Admin is served at
`/admin/`, while landing owns `/preview/admin`. Build Admin with that stand's
`VITE_LANDING_PREVIEW_URL` value, and build landing with the matching
`VITE_ADMIN_PREVIEW_ORIGIN`. Runtime values come from the matching GitHub
Environment variables or stand-local env files; the source-controlled matrix below
is the operator reference for those environments. The Admin image build asserts
that its compiled assets include a valid preview URL, and the landing image build
asserts that the accepted Admin origin is valid. Draft media IDs and product
category IDs are resolved in the Admin client into transient URL/name fields before
posting; they are neither persisted nor placed in the URL.

Current stand values:

| Environment | Admin `VITE_LANDING_PREVIEW_URL` | Landing `VITE_ADMIN_PREVIEW_ORIGIN` |
| --- | --- | --- |
| DEV/test | `https://176.108.243.2/preview/admin` | `https://176.108.243.2` |
| production | `https://176.108.242.159/preview/admin` | `https://176.108.242.159` |
# Moderation boundary

Landing renders backend-filtered public DTOs only. Pending moderation revisions
are administrative data and must never be added to list, detail, search,
related-content, carousel, privacy, or document public requests. The sole
draft visualisation boundary is `/preview/admin`, which accepts an in-memory,
exact-origin `postMessage` from Admin and does not fetch or publish a review
revision.
## Draft review and publication

All managed CMS types are authored as drafts by `FEATURE_OWNER`; `CONTENT_READER`
is read-only. A submitted revision is immutable and remains absent from
public responses until an `ADMIN` publishes that exact revision. The landing
application consumes published projections only; it never calls moderation or
admin APIs. Review notifications go to administrator-configured recipients
after the submission transaction commits, using only a persisted trusted
non-local Admin origin. Mail failure or an unavailable safe origin never changes
the review outcome.
