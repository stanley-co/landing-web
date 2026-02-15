/**
 * Конфигурация сайта для SEO: canonical URL, Open Graph, базовые мета-данные.
 * VITE_SITE_URL задаётся при сборке (например https://example.com без слэша в конце).
 */

const envUrl =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_SITE_URL;

/** Базовый URL сайта (без завершающего слэша). В браузере — из env или window.location. */
export function getSiteUrl(): string {
  if (envUrl && typeof envUrl === 'string') {
    return envUrl.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}

/** Строит canonical URL для пути: без query, без hash, единый домен. */
export function getCanonicalUrl(path: string): string {
  const base = getSiteUrl();
  if (!base) return path || '/';
  const cleanPath = path || '/';
  const pathOnly = cleanPath.split('?')[0].split('#')[0];
  const normalized = pathOnly === '' ? '/' : pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  return `${base}${normalized}`;
}

export const DEFAULT_META = {
  title: 'ФКИТ - Промышленное оборудование для производства',
  description:
    'Вакуумные эмульгаторы, миксеры, дозаторы и резервуары для косметики и химии',
  ogType: 'website' as const,
  /** Относительный путь к изображению для OG (например /og-image.png). */
  ogImagePath: '/og-image.png', // положите og-image.png в public/ (рекомендуется 1200×630)
} as const;
