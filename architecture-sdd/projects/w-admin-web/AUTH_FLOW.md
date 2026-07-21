# Auth Flow

Login -> `/api/v1/auth/login`; fetch `/me`; store auth state via query/cache. Prefer httpOnly cookies; frontend handles 401 by redirect to `/login`.

Logout calls `/api/v1/auth/logout`.

