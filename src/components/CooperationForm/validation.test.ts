import { describe, expect, it } from 'vitest';
import { isValidPhone } from './validation';

describe('lead phone validation', () => {
  it.each(['+7 999 000-00-00', '+7 (999) 000-00-00', '89990000000'])('accepts %s', (phone) => {
    expect(isValidPhone(phone)).toBe(true);
  });

  it.each(['call-me', '12345', '+7 999 ABC-00-00'])('rejects %s', (phone) => {
    expect(isValidPhone(phone)).toBe(false);
  });
});
