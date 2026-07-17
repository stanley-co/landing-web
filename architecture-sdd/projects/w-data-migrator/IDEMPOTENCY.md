# Idempotency

Repeated imports must not create duplicates.

Use upsert by `external_id`. Preserve manual admin changes only if import mode is configured to skip existing; default MVP can update imported records before production handover.

