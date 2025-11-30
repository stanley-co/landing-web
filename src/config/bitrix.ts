/**
 * Конфигурация для интеграции с Bitrix24 через Inbound Webhook
 * 
 * Настройка через переменные окружения:
 * 1. Скопируйте .env.example в .env.local
 * 2. Заполните реальными значениями
 * 
 * Инструкция по получению webhook URL:
 * 1. Откройте ваш Bitrix24 портал
 * 2. Перейдите в раздел "Приложения" -> "Входящий вебхук"
 * 3. Создайте новый вебхук с правами на "CRM: Лиды"
 * 4. Скопируйте URL вебхука и вставьте в .env.local
 * 
 * Формат URL вебхука:
 * https://your-domain.bitrix24.ru/rest/1/your_webhook_key/crm.lead.add.json
 * 
 * ВАЖНО: Этот файл содержит публичный webhook URL, который безопасно использовать
 * в клиентском коде, так как он не требует OAuth авторизации.
 */

// URL вебхука Bitrix24 для создания лидов
// Настраивается через переменную окружения VITE_BITRIX_WEBHOOK_URL в .env.local
export const BITRIX_WEBHOOK_URL = 
  import.meta.env.VITE_BITRIX_WEBHOOK_URL || 
  'https://your-domain.bitrix24.ru/rest/1/your_webhook_key/crm.lead.add.json';

// Демонстрационный режим
// Настраивается через переменную окружения VITE_BITRIX_DEMO_MODE в .env.local
// true - форма работает в демо-режиме (не отправляет запросы)
// false - форма отправляет запросы в Bitrix24
export const BITRIX_DEMO_MODE = 
  import.meta.env.VITE_BITRIX_DEMO_MODE === 'true' || 
  import.meta.env.VITE_BITRIX_DEMO_MODE === true;

// Отключение формы обратной связи
// Настраивается через переменную окружения VITE_FORM_DISABLED в .env.local
// true - форма полностью скрыта/отключена
// false - форма отображается и работает
export const FORM_DISABLED = 
  import.meta.env.VITE_FORM_DISABLED === 'true' || 
  import.meta.env.VITE_FORM_DISABLED === true;

/**
 * Проверяет, настроен ли webhook URL
 */
export const isBitrixConfigured = (): boolean => {
  // Если включен демо-режим, считаем что не настроено
  if (BITRIX_DEMO_MODE) {
    return false;
  }
  
  const configured = BITRIX_WEBHOOK_URL.includes('your-domain') === false && 
                     BITRIX_WEBHOOK_URL.trim() !== '';
  
  return configured;
};

/**
 * Проверяет, включен ли демо-режим
 */
export const isDemoMode = (): boolean => {
  return BITRIX_DEMO_MODE;
};

/**
 * Проверяет, отключена ли форма
 */
export const isFormDisabled = (): boolean => {
  return FORM_DISABLED;
};

// Логируем конфигурацию при загрузке модуля
if (typeof window !== 'undefined') {
  console.log('========================================');
  console.log('[Bitrix Config] Configuration loaded');
  console.log('[Bitrix Config] Webhook URL:', BITRIX_WEBHOOK_URL);
  console.log('[Bitrix Config] Environment variable VITE_BITRIX_WEBHOOK_URL:', import.meta.env.VITE_BITRIX_WEBHOOK_URL || 'not set');
  console.log('[Bitrix Config] Demo mode:', BITRIX_DEMO_MODE ? 'ENABLED' : 'DISABLED');
  console.log('[Bitrix Config] Environment variable VITE_BITRIX_DEMO_MODE:', import.meta.env.VITE_BITRIX_DEMO_MODE || 'not set');
  console.log('[Bitrix Config] Form disabled:', FORM_DISABLED ? 'YES' : 'NO');
  console.log('[Bitrix Config] Environment variable VITE_FORM_DISABLED:', import.meta.env.VITE_FORM_DISABLED || 'not set');
  console.log('[Bitrix Config] Is configured:', isBitrixConfigured());
  
  if (FORM_DISABLED) {
    console.warn('[Bitrix Config] ⚠️ FORM IS DISABLED - Contact form will not be displayed');
    console.warn('[Bitrix Config] To enable: Set VITE_FORM_DISABLED=false in .env.local');
  } else if (BITRIX_DEMO_MODE) {
    console.warn('[Bitrix Config] ⚠️ DEMO MODE IS ENABLED - Forms will not send requests to Bitrix24');
    console.warn('[Bitrix Config] To disable: Set VITE_BITRIX_DEMO_MODE=false in .env.local');
  } else if (!isBitrixConfigured()) {
    console.warn('[Bitrix Config] ⚠️ Webhook URL is not configured! Form will run in DEMO mode.');
    console.warn('[Bitrix Config] To configure: Set VITE_BITRIX_WEBHOOK_URL in .env.local');
  }
  console.log('========================================');
}

