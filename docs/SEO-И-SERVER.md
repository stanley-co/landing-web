# SEO и настройка сервера

## Реализовано в проекте

### 1. Open Graph и превью в соцсетях
- В `index.html`: базовые `og:title`, `og:description`, `og:type`, `og:url`, `og:image`.
- Компонент `DocumentHead` обновляет эти мета-теги при навигации и задаёт страничные значения.
- Для статей: `og:type="article"`, своё изображение и описание.
- Рекомендуется положить изображение **1200×630** в `public/og-image.png` (по умолчанию используется путь `/og-image.png`).

### 2. Canonical URL
- На каждой странице выставляется `<link rel="canonical" href="…">` через `DocumentHead`.
- Используется единый базовый URL из `VITE_SITE_URL` (см. `.env.example`).
- Canonical без query и hash, один домен (http→https и www→non-www настраиваются на стороне сервера).

### 3. HTTP-статусы и доступность
- **Публичные страницы**: сервер отдаёт `index.html` с кодом **200 OK** (настройка в `vercel.json` / `netlify.toml`).
- **Несуществующие пути**: в SPA сервер всё равно отдаёт `index.html` (200); приложение показывает страницу 404. Чтобы отдавать реальный **404** для неизвестных путей, нужна серверная логика (например, проверка списка маршрутов в serverless-функции).
- **Редиректы**: принудительный HTTPS и единый домен (www → без www или наоборот) настраиваются на хостинге (Vercel/Netlify: Force HTTPS, Domain redirects). Избегайте цепочек редиректов.
- **301**: для смены домена или http→https используйте 301 на стороне CDN/сервера.

### 4. SSR / prerender (SPA)
- В `index.html` заданы базовые meta и Open Graph — при отсутствии JS бот всё равно видит заголовок, описание и og-теги (нет полностью пустого HTML).
- В production-сборке можно использовать **vite-plugin-prerender**, чтобы боты получали готовый HTML с контентом страницы.
- Установка (опционально):
  ```bash
  npm i -D vite-plugin-prerender @prerenderer/renderer-puppeteer puppeteer
  ```
- В `vite.config.ts` уже подготовлена подключение плагина для маршрутов: `/`, `/equipment`, `/information`, `/about`, `/contacts`, `/home`.
- После сборки в `dist/` по этим путям будет лежать готовый HTML (например, `dist/equipment/index.html`).
- Для маршрутов с динамическим id (`/equipment/:id`, `/news/:id`) prerender не настроен; при необходимости можно добавить список id на этапе сборки.

## Переменные окружения

- **`VITE_SITE_URL`** — полный URL сайта без слэша в конце (например, `https://example.com`). Нужен для canonical и абсолютных og:image/og:url в production.
