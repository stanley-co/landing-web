# FKIT Landing Web

The public FKIT frontend, built with React, TypeScript, and Vite. This repository is also the system control point: it routes cross-repository work without owning the internal documentation of other services.

## Start here

- [AGENTS.md](AGENTS.md) defines the landing and cross-repository agent protocol.
- [System documentation](docs/system/README.md) contains the repository registry, architecture overview, dependencies, contracts, and change-routing matrix.
- [.project/repositories.yaml](.project/repositories.yaml) is the machine-readable registry.
- [Deprecated documentation](docs/deprecated/README.md) preserves historical SDD material; it is not authoritative.

## Landing development

Install dependencies with `npm ci`, then use the scripts in [package.json](package.json): `dev`, `lint`, `typecheck`, `test`, `build`, and `generate:api`.

The public frontend consumes the OpenAPI contract owned by [`w-api-contracts`](https://github.com/stanley-co/w-api-contracts). Backend behavior, administration UI, and runtime deployment remain in their own repositories.
