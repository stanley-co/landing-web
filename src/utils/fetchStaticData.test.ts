import { describe, expect, it } from 'vitest';

import { getImageUrl } from './fetchStaticData';

describe('getImageUrl', () => {
  it('preserves backend-provided same-origin media URLs', () => {
    expect(getImageUrl('/media/kitexp-staging-media/products/example.webp')).toBe(
      '/media/kitexp-staging-media/products/example.webp',
    );
  });

  it('preserves absolute external URLs', () => {
    expect(getImageUrl('https://cdn.example.invalid/example.webp')).toBe(
      'https://cdn.example.invalid/example.webp',
    );
  });
});
