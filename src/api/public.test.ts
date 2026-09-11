import { describe, expect, it } from 'vitest';
import { landingApi } from './public';

describe('landing public projection boundary', () => {
  it('exposes only public endpoint adapters and no administrative moderation adapter', () => {
    expect(Object.keys(landingApi)).toEqual([
      'products', 'product', 'categories', 'content', 'contentItem', 'slides', 'privacyPolicy', 'documents', 'createLead',
    ]);
    expect('moderation' in landingApi).toBe(false);
    expect('previewRevision' in landingApi).toBe(false);
  });
});
