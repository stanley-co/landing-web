import { describe, expect, it } from 'vitest';
import { trustedAdminDraft } from './adminPreviewBridge';

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
