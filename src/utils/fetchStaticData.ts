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
 * URL-константы для S3-хранилища
 */
export const S3_URLS = {
  PRODUCTS: 'https://storage.yandexcloud.net/stanley-co/data/products/products.json',
  NEWS: 'https://storage.yandexcloud.net/stanley-co/data/news/news.json'
} as const;

