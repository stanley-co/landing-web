import createClient from 'openapi-fetch';
import type { paths } from './generated/schema';

/** Public API only. The landing never holds administrative credentials. */
const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL?.trim() || '/api/v1';

export const publicApi = createClient<paths>({ baseUrl });

publicApi.use({
  onRequest({ request }) {
    request.headers.set('X-Request-Id', crypto.randomUUID());
    return request;
  }
});

type ApiEnvelope<T> = { data?: T; error?: { message?: string }; response: Response };

class NonRetryablePublicApiError extends Error {}

/** Safe GETs have a bounded timeout and one retry for transient failures only. */
export async function publicGet<T>(request: (signal: AbortSignal) => Promise<ApiEnvelope<T>>): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);
    try {
      const result = await request(controller.signal);
      if (result.data !== undefined) return result.data;
      const error = new Error(result.error?.message ?? `Сервис вернул HTTP ${result.response.status}`);
      if (result.response.status < 500) {
        throw new NonRetryablePublicApiError(error.message);
      }
      if (attempt === 1) throw error;
      lastError = error;
    } catch (error) {
      if (error instanceof NonRetryablePublicApiError) throw error;
      lastError = error instanceof Error && error.name === 'AbortError'
        ? new Error('Превышено время ожидания ответа сервера')
        : error instanceof Error ? error : new Error('Сервис временно недоступен');
      if (attempt === 1) throw lastError;
    } finally {
      window.clearTimeout(timeout);
    }
  }
  throw lastError ?? new Error('Сервис временно недоступен');
}

export async function apiResult<T>(request: Promise<{ data?: T; error?: { message?: string } }>): Promise<T> {
  const { data, error } = await request;
  if (data === undefined) throw new Error(error?.message ?? 'Сервис временно недоступен');
  return data;
}
