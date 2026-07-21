# System Roles

Use exactly three roles in MVP.

| Модуль | Операция | ADMIN | FEATURE_OWNER | CONTENT_READER |
| --- | --- | --- | --- | --- |
| Users/RBAC | read users/roles | yes | no | no |
| Users/RBAC | create/update/block users | yes | no | no |
| Users/RBAC | edit roles/permissions | yes | no | no |
| Catalog | read | yes | yes | yes |
| Catalog | create/update | yes | yes | no |
| Catalog | archive/restore | yes | yes | no |
| Catalog | reorder | yes | yes | no |
| Content | read | yes | yes | yes |
| Content | create/update | yes | yes | no |
| Content | archive/restore | yes | yes | no |
| Pages | read | yes | yes | yes |
| Pages | update sections | yes | yes | no |
| Legacy | read | yes | yes | yes |
| Legacy | update deprecated blocks | yes | yes | no |
| Slides | manage | yes | yes | no |
| Contacts/Menu | manage | yes | yes | no |
| Media | upload/replace | yes | yes | no |
| Media | delete unused | yes | yes | no |
| Documents/PDF | manage | yes | yes | no |
| Certificates | manage | yes | yes | no |
| Leads | read | yes | yes | conditional |
| Leads | update status | yes | yes | no |
| Leads | retry email | yes | yes | no |
| Settings | public settings | yes | yes | read only |
| Settings | secrets/security | yes | no | no |
| Audit | read | yes | limited own module | limited |
| System operations | run migration/reindex | yes | no | no |

