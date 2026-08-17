# Categories

Route: `/catalog/categories`.

Data: category tree, sort order, active/status.

Actions: create, edit, reorder, archive if unused.

Acceptance: tree order matches public catalog; archive blocked when products exist.

## Code Validation Addendum 2026-07-17

Current frontend uses `globalCategory` as the top-level group and `category` as subcategory. `Header` also has hardcoded top-level anchors, while `EquipmentPage` derives displayed sections from product data and sorts by a known order.

Admin requirements:

- tree with top-level global categories and child categories;
- explicit manual `sortOrder` for both levels;
- counts of active products per category;
- archive blocked when products exist unless products are moved first;
- stable anchor/route compatibility for public catalog;
- import must create categories from current S3 values, including categories not present in old fallback lists.

Acceptance: public category tree and catalog counts match current S3 after import.
