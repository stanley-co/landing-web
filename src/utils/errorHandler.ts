/**
 * Утилита для детальной обработки ошибок при отправке формы в Bitrix24
 */

export type ErrorType = 
  | 'CORS_ERROR'
  | 'NETWORK_ERROR'
  | 'BITRIX_ERROR'
  | 'TIMEOUT_ERROR'
  | 'UNKNOWN_ERROR';

export interface FormError {
  type: ErrorType;
  message: string;
  userMessage: string;
  originalError?: unknown;
}

/**
 * Определяет тип ошибки на основе перехваченного исключения
 */
export function parseFormError(error: unknown): FormError {
  // Обработка ошибок типа TypeError (сетевые ошибки, CORS)
  if (error instanceof TypeError) {
    const errorMessage = error.message.toLowerCase();
    
    // CORS ошибки
    if (errorMessage.includes('cors') || 
        errorMessage.includes('access-control-allow-origin') ||
        errorMessage.includes('blocked by cors policy')) {
      return {
        type: 'CORS_ERROR',
        message: error.message,
        userMessage: 'Ошибка подключения к серверу. Возможно, проблема с настройками безопасности. Попробуйте позже или свяжитесь с нами по телефону.',
        originalError: error
      };
    }
    
    // Сетевые ошибки
    if (errorMessage.includes('failed to fetch') ||
        errorMessage.includes('networkerror') ||
        errorMessage.includes('network error')) {
      return {
        type: 'NETWORK_ERROR',
        message: error.message,
        userMessage: 'Ошибка сети. Проверьте подключение к интернету и попробуйте еще раз. Если проблема сохраняется, свяжитесь с нами по телефону.',
        originalError: error
      };
    }
  }
  
  // Обработка ошибок от fetch (AbortError, TimeoutError)
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    
    if (errorMessage.includes('aborted') || 
        errorMessage.includes('timeout') ||
        errorMessage.includes('timed out')) {
      return {
        type: 'TIMEOUT_ERROR',
        message: error.message,
        userMessage: 'Превышено время ожидания ответа от сервера. Попробуйте еще раз через несколько секунд.',
        originalError: error
      };
    }
    
    // Ошибки от Bitrix24 API
    if (error.message.includes('error') || 
        error.message.includes('ERROR') ||
        error.message.includes('Bitrix24')) {
      return {
        type: 'BITRIX_ERROR',
        message: error.message,
        userMessage: error.message || 'Ошибка при обработке заявки на сервере. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.',
        originalError: error
      };
    }
  }
  
  // Неизвестная ошибка
  return {
    type: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : String(error),
    userMessage: 'Произошла непредвиденная ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.',
    originalError: error
  };
}

/**
 * Форматирует детальное сообщение об ошибке для логирования
 */
export function formatErrorDetails(error: FormError): string {
  const parts = [
    `Тип ошибки: ${error.type}`,
    `Сообщение: ${error.message}`,
    `Сообщение для пользователя: ${error.userMessage}`
  ];
  
  if (error.originalError instanceof Error && error.originalError.stack) {
    parts.push(`Stack trace: ${error.originalError.stack}`);
  }
  
  return parts.join('\n');
}

