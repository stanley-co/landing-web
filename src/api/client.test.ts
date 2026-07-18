import { describe, expect, it, vi } from 'vitest';
import { apiResult, publicGet } from './client';

describe('public API transport', () => {
  it('returns a successful response without retrying', async () => {
    const request = vi.fn(async () => ({ data: { id: 'ok' }, response: new Response(null, { status: 200 }) }));

    await expect(publicGet(request)).resolves.toEqual({ id: 'ok' });
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('retries one transient server failure', async () => {
    const request = vi.fn()
      .mockResolvedValueOnce({ error: { message: 'temporary' }, response: new Response(null, { status: 503 }) })
      .mockResolvedValueOnce({ data: ['recovered'], response: new Response(null, { status: 200 }) });

    await expect(publicGet(request)).resolves.toEqual(['recovered']);
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('does not retry a validation or not-found response', async () => {
    const request = vi.fn(async () => ({ error: { message: 'not found' }, response: new Response(null, { status: 404 }) }));

    await expect(publicGet(request)).rejects.toThrow('not found');
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('accepts a falsey but defined command response', async () => {
    await expect(apiResult(Promise.resolve({ data: false }))).resolves.toBe(false);
  });
});
