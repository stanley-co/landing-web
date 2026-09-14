import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProductCategoryDto } from '../api/public';
import { normalizeEquipmentCategories, scrollToEquipmentHash } from './equipmentCategories';

const category = (overrides: Partial<ProductCategoryDto>): ProductCategoryDto => ({
  id: 'id',
  code: 'CAT-1',
  name: 'Категория',
  anchor: 'category-anchor',
  sortOrder: 0,
  activeProductCount: 1,
  children: [],
  ...overrides,
});

describe('normalizeEquipmentCategories', () => {
  it('keeps backend anchors stable when display names change', () => {
    const result = normalizeEquipmentCategories([
      category({ name: 'Новое имя', anchor: 'stable-anchor' }),
    ]);

    expect(result[0]).toMatchObject({ name: 'Новое имя', anchor: 'stable-anchor' });
  });

  it('uses a changed backend anchor and omits categories without a public anchor', () => {
    const result = normalizeEquipmentCategories([
      category({ name: 'Переякоренная', anchor: 'new-anchor' }),
      category({ id: 'missing-anchor', name: 'Без якоря', anchor: undefined }),
    ]);

    expect(result.map(({ anchor }) => anchor)).toEqual(['new-anchor']);
  });

  it('filters categories by public products and preserves backend order', () => {
    const result = normalizeEquipmentCategories([
      category({ id: 'second', name: 'Вторая', anchor: 'second', sortOrder: 2 }),
      category({ id: 'empty', name: 'Пустая', anchor: 'empty', sortOrder: 1 }),
      category({ id: 'first', name: 'Первая', anchor: 'first', sortOrder: 0 }),
    ], [
      { globalCategory: 'Вторая', category: 'Подкатегория' },
      { globalCategory: 'Первая', category: 'Другая' },
    ]);

    expect(result.map(({ anchor }) => anchor)).toEqual(['first', 'second']);
  });

  it('preserves ordered child categories for the page filter', () => {
    const result = normalizeEquipmentCategories([
      category({
        children: [
          category({ id: 'child-2', name: 'Второй child', anchor: 'child-2', sortOrder: 2 }),
          category({ id: 'child-1', name: 'Первый child', anchor: 'child-1', sortOrder: 1 }),
        ],
      }),
    ], [
      { globalCategory: 'Категория', category: 'Первый child' },
      { globalCategory: 'Категория', category: 'Второй child' },
    ]);

    expect(result[0].children.map(({ name }) => name)).toEqual(['Первый child', 'Второй child']);
  });
});

describe('scrollToEquipmentHash', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('scrolls only when the rendered section exists', () => {
    const scrollIntoView = vi.fn();
    const section = document.createElement('section');
    section.id = 'known-anchor';
    section.scrollIntoView = scrollIntoView;
    document.body.append(section);

    expect(scrollToEquipmentHash('#known-anchor')).toBe(true);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(scrollToEquipmentHash('#missing-anchor')).toBe(false);
  });
});
