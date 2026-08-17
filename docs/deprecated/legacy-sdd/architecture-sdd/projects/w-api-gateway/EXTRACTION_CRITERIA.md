# Extraction Criteria

Create separate deployable `w-api-gateway` only when one or more is true:

- multiple backend services exist;
- independent release cycles;
- separate gateway scaling;
- external integration APIs need aggregation;
- centralized OAuth is required;
- dedicated platform team owns edge;
- API aggregation/BFF behavior cannot stay in backend.

