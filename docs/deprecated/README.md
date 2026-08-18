# Deprecated Documentation

This directory preserves landing-hosted historical documentation so Git history and implementation rationale remain discoverable. Nothing here is a source of truth for current service behavior.

| Archive | Classification | Replacement / current owner | Retained use |
| --- | --- | --- | --- |
| `legacy-sdd/architecture-sdd/` | HISTORICAL and PARTIALLY_VALID | Per-service `docs/sdd/`; system-only summary in `../system/` | Traceability, previous decisions, and migration history |
| `legacy-plans/` | SUPERSEDED or HISTORICAL | `w-platform-infra/docs/`, service-local `docs/implementation/`, and `../system/` | Delivery history and old assumptions |
| `legacy-landing-docs/` | PARTIALLY_VALID | Landing code/docs, backend storage docs, or infrastructure docs as identified by each document | Reference during a verified update only |

The historical SDD was classified against code, package manifests, backend controllers, OpenAPI, Compose, nginx, CI, and Git history. In a conflict, use implemented code and owner documentation. In particular, its standalone `w-api-gateway` plans are historical: the current MVP implements edge duties inside `w-backend-service`.
