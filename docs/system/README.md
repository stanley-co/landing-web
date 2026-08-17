# FKIT System Documentation

`landing-web` is FKIT's orchestration/control point, not a monorepo or the owner of every service's internals. This directory contains only system-level information required to locate repositories, assess cross-service impact, and route work to the correct owner.

- [Repository registry](repositories.md) — canonical remotes, ownership, consumers, and documentation locations.
- [Architecture overview](architecture-overview.md) — verified system boundaries.
- [Dependencies](dependencies.md) — provider/consumer dependency map.
- [Contracts](contracts.md) — contract ownership and consumer rules.
- [Change routing](change-routing.md) — required impact analysis and validation sequence.

For service detail, load the target repository's `AGENTS.md` and its `docs/` directory. Historical landing SDD is preserved under [`../deprecated/`](../deprecated/README.md) and is never the primary source of truth.
