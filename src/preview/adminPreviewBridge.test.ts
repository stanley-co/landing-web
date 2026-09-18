import { describe, expect, it } from 'vitest';
import { adminPreviewOrigin, trustedAdminDraft } from './adminPreviewBridge';

describe('adminPreviewOrigin', () => {
  it('uses a configured domain origin when it is safe', () => {
    expect(adminPreviewOrigin('https://admin.example')).toBe('https://admin.example');
  });

  it('falls back from an IP-configured origin to the current Admin host', () => {
    const location = new URL('https://dev.kitexp.ru/preview/admin') as unknown as Location;
    expect(adminPreviewOrigin('https://176.108.243.2', location)).toBe('https://admin.dev.kitexp.ru');
  });

  it('derives the production Admin origin from the public landing host when configuration is missing', () => {
    const location = new URL('https://new.kitexp.ru/preview/admin') as unknown as Location;
    expect(adminPreviewOrigin(undefined, location)).toBe('https://admin.new.kitexp.ru');
  });

  it('prefers the current public host over a compiled domain from another stand', () => {
    const location = new URL('https://new.kitexp.ru/preview/admin') as unknown as Location;
    expect(adminPreviewOrigin('https://admin.dev.kitexp.ru', location)).toBe('https://admin.new.kitexp.ru');
  });
});

describe('trustedAdminDraft', () => {
  const message = { type: 'landing-admin-preview', draft: { kind: 'content', value: { title: 'Draft' } } };
  it('accepts a well-formed draft only from the configured Admin origin', () => {
    expect(trustedAdminDraft('https://admin.example', 'https://admin.example', message)).toEqual(message.draft);
  });
  it('rejects unconfigured, foreign, and malformed messages', () => {
    expect(trustedAdminDraft('https://admin.example', undefined, message)).toBeUndefined();
    expect(trustedAdminDraft('https://other.example', 'https://admin.example', message)).toBeUndefined();
    expect(trustedAdminDraft('https://admin.example', 'https://admin.example', { type: 'other' })).toBeUndefined();
  });
});
