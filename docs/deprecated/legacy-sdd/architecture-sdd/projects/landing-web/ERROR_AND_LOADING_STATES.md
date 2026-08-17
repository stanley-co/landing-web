# Error And Loading States

Use current IonSpinner states as baseline. Add skeletons only where simple.

Rules:

- product/content detail 404 must show current not-found style;
- validation errors from lead API shown near fields;
- network errors use user-safe text and request ID when available;
- empty lists show explicit empty state;
- search uses debounce and cancel previous request.

