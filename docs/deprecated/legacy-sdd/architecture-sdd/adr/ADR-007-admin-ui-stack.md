# ADR-007 Admin UI Stack

Status: Accepted.

Decision: `w-admin-web` uses React, TypeScript, Vite, React Router, TanStack Query, React Hook Form, Zod, OpenAPI-generated client and Ant Design.

Why Ant Design:

- strong tables, forms, modals, upload and layout primitives;
- fast enterprise/admin development;
- good pagination/filter/sorting patterns;
- mature documentation and ecosystem;
- accessible enough for MVP with disciplined usage;
- theme customization is sufficient.

Alternatives:

- Material UI: strong but heavier visual opinion and less direct enterprise table/forms fit.
- Mantine: productive, but enterprise table/upload patterns require more assembly.
- PrimeReact: rich widgets, but design and ecosystem less aligned with expected admin quality.
- custom UI-kit: rejected for MVP speed.

