import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProductCategoryDto } from '../api/public';
import {
  normalizeEquipmentCategories,
  scrollToEquipmentHash,
  scrollToEquipmentHashWhenReady,
} from './equipmentCategories';

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

const categoryWithParent = (
  overrides: Partial<ProductCategoryDto> & { parentId?: string | null },
): ProductCategoryDto => overrides as ProductCategoryDto;

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

  it('counts shared child names only within their matching root and omits empty children', () => {
    const result = normalizeEquipmentCategories([
      category({
        id: 'root-a',
        name: 'Корень A',
        anchor: 'root-a',
        children: [
          category({ id: 'a-shared', name: 'Общая подкатегория', anchor: 'a-shared' }),
          category({ id: 'a-empty', name: 'Пустая подкатегория', anchor: 'a-empty' }),
        ],
      }),
      category({
        id: 'root-b',
        name: 'Корень B',
        anchor: 'root-b',
        children: [
          category({ id: 'b-shared', name: 'Общая подкатегория', anchor: 'b-shared' }),
        ],
      }),
    ], [
      { globalCategory: 'Корень A', category: 'Другая подкатегория' },
      { globalCategory: 'Корень B', category: 'Общая подкатегория' },
    ]);

    expect(result[0].children).toEqual([]);
    expect(result[1].children.map(({ name, productCount }) => ({ name, productCount }))).toEqual([
      { name: 'Общая подкатегория', productCount: 1 },
    ]);
  });

  it('skips blank and duplicate root anchors while preserving sorted unique roots', () => {
    const result = normalizeEquipmentCategories([
      category({ id: 'blank', name: 'Пустой anchor', anchor: '   ', sortOrder: 0 }),
      category({ id: 'first', name: 'Первый', anchor: 'same', sortOrder: 1 }),
      category({ id: 'duplicate', name: 'Дубликат', anchor: 'same', sortOrder: 2 }),
      category({ id: 'last', name: 'Последний', anchor: 'last', sortOrder: 3 }),
    ]);

    expect(result.map(({ name, anchor }) => ({ name, anchor }))).toEqual([
      { name: 'Первый', anchor: 'same' },
      { name: 'Последний', anchor: 'last' },
    ]);
  });

  it('keeps only level-1 categories as roots when the public payload is flat', () => {
    const result = normalizeEquipmentCategories([
      categoryWithParent({ id: 'root', name: 'Корень', anchor: 'root', sortOrder: 0, parentId: null }),
      categoryWithParent({ id: 'child', name: 'Дочерняя', anchor: 'child', sortOrder: 0, parentId: 'root' }),
    ], [
      { globalCategory: 'Корень', category: 'Дочерняя' },
      { globalCategory: 'Дочерняя', category: 'Лишняя root-связь' },
    ]);

    expect(result.map(({ name }) => name)).toEqual(['Корень']);
    expect(result[0].children).toEqual([]);
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

  it('retries after an early miss so async-rendered sections can be reached', () => {
    const callbacks: FrameRequestCallback[] = [];
    const requestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    const cancelAnimationFrame = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    const scrollIntoView = vi.fn();

    scrollToEquipmentHashWhenReady('#async-anchor', 'auto', 3);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);

    const section = document.createElement('section');
    section.id = 'async-anchor';
    section.scrollIntoView = scrollIntoView;
    document.body.append(section);
    callbacks.shift()?.(0);

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
    expect(cancelAnimationFrame).not.toHaveBeenCalled();

    requestAnimationFrame.mockRestore();
    cancelAnimationFrame.mockRestore();
  });
});
