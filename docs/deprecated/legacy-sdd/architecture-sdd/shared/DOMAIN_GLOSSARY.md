# Domain Glossary

| Term | Meaning |
| --- | --- |
| Product | Equipment catalog item shown at `/equipment/:id`. Existing public ID must be preserved. |
| Product category | Hierarchical grouping: global category and subcategory from current product data. |
| Content item | News or article. Public route remains `/news/:id` for both. |
| Content block | Paragraph, image, quote or link inside a content item. |
| Page | Public route page such as `/about`, `/contacts`, `/privacy-policy`, `/home`. |
| Legacy block | Deprecated but supported `/home` content block. |
| Media file | Metadata row for binary object in S3/MinIO. |
| Document | PDF or other managed document with metadata and visibility. |
| Certificate | Document subtype or linked entity with certificate number and validity dates. |
| Lead | User request from public form. Stored before notification. |
| Notification event | Delivery attempt for lead notification, email in MVP. |
| External ID / legacy ID | Existing public ID from S3 JSON or legacy frontend. |

