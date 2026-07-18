import createClient from 'openapi-fetch';
import type { paths } from './generated/schema';

/** Public API only. The landing never holds administrative credentials. */
const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api/v1';

export const publicApi = createClient<paths>({ baseUrl });

export async function apiResult<T>(request: Promise<{ data?: T; error?: { message?: string } }>): Promise<T> {
  const { data, error } = await request;
  if (!data) throw new Error(error?.message ?? 'Сервис временно недоступен');
  return data;
}
