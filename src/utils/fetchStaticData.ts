/**
 * Утилита для загрузки статических данных из S3-хранилища
 * с кэшированием и обработкой ошибок
 */

// Интерфейс для кэшированных данных
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Время жизни кэша (5 минут)
const CACHE_TTL = 5 * 60 * 1000;

// Хранилище кэша в памяти
const cache = new Map<string, CacheEntry<any>>();

/**
 * Универсальный метод для загрузки данных из S3-хранилища
 * @param url - URL для загрузки данных
 * @returns Promise с загруженными данными
 */
export async function fetchStaticData<T>(url: string): Promise<T> {
  console.log(`[fetchStaticData] Загрузка данных из: ${url}`);
  
  // Проверяем кэш
  const cached = cache.get(url);
  const now = Date.now();
  
  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    console.log(`[fetchStaticData] Данные получены из кэша для: ${url}`);
    console.log('[fetchStaticData] Статус: success (cached)');
    return cached.data as T;
  }
  
  try {
    console.log(`[fetchStaticData] Статус: loading...`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Добавляем параметр для обхода кэша браузера
      cache: 'no-cache'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Сохраняем в кэш
    cache.set(url, {
      data,
      timestamp: now
    });
    
    console.log(`[fetchStaticData] Статус: success`);
    console.log(`[fetchStaticData] Данные успешно загружены и закэшированы`);
    
    return data as T;
  } catch (error) {
    console.error(`[fetchStaticData] Статус: error`);
    console.error(`[fetchStaticData] Ошибка при загрузке данных из ${url}:`, error);
    throw new Error(`Не удалось загрузить данные из ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Очистка кэша (опционально, для ручного управления)
 */
export function clearCache(url?: string) {
  if (url) {
    cache.delete(url);
    console.log(`[fetchStaticData] Кэш очищен для: ${url}`);
  } else {
    cache.clear();
    console.log(`[fetchStaticData] Весь кэш очищен`);
  }
}

/**
 * Базовые настройки для S3-хранилища (host и bucket)
 * Значения могут быть переопределены через Vite-переменные окружения:
 * - VITE_S3_HOST   — хост/endpoint для S3 (по умолчанию https://storage.yandexcloud.net)
 * - VITE_S3_BUCKET — название bucket (по умолчанию stanley-co)
 */
const S3_HOST =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_S3_HOST) ||
  'https://storage.yandexcloud.net';

const S3_BUCKET =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_S3_BUCKET) ||
  'stanley-co';

// Нормализуем host (убираем завершающий слэш, если есть)
const NORMALIZED_S3_HOST = S3_HOST.replace(/\/+$/, '');

// Базовый URL для bucket
const S3_BASE_URL = `${NORMALIZED_S3_HOST}/${S3_BUCKET}`;

/**
 * URL-константы для S3-хранилища
 */
export const S3_URLS = {
  PRODUCTS: `${S3_BASE_URL}/data/products/products.json`,
  NEWS: `${S3_BASE_URL}/data/news/news.json`,
  ARTICLES: `${S3_BASE_URL}/data/articles/articles.json`,
  CAROUSEL: `${S3_BASE_URL}/data/carousel/carousel.json`,
  BASE: S3_BASE_URL
} as const;

/**
 * Возвращает полный URL для произвольного файла в S3 bucket
 * @param relativePath - относительный путь внутри bucket (например, "docs/privacy/processingPersonalData.pdf")
 */
export function getS3FileUrl(relativePath: string): string {
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${S3_BASE_URL}/${cleanPath}`;
}

/**
 * Преобразует относительный путь изображения в полный URL S3
 * @param imagePath - Относительный путь изображения из S3 (например, "images/products/vm-01.jpg")
 * @returns Полный URL изображения в S3
 */
export function getImageUrl(imagePath: string | undefined): string {
  if (!imagePath) {
    return '';
  }

  
  // Если путь уже является полным URL, возвращаем как есть
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // The backend returns same-origin public URLs such as /media/<bucket>/<key>.
  // Keep them untouched so test builds never rewrite them to the legacy S3 host.
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Если путь начинается с "/", убираем его и добавляем к базовому URL
  return `${S3_URLS.BASE}/${imagePath}`;
}
