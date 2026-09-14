import type { ProductCategoryDto } from '../api/public';
import type { Product } from '../types/product';

export type EquipmentCategory = {
  id: string;
  name: string;
  anchor: string;
  sortOrder: number;
  productCount: number;
  children: EquipmentCategory[];
};

type CategoryProduct = Pick<Product, 'globalCategory' | 'category'>;
type PublicCategoryWithParent = ProductCategoryDto & { parentId?: string | null };

const hasParent = (category: ProductCategoryDto): boolean => {
  const parentId = (category as PublicCategoryWithParent).parentId;
  return parentId !== undefined && parentId !== null && parentId !== '';
};

const sortCategories = (categories: ProductCategoryDto[]): ProductCategoryDto[] =>
  categories
    .map((category, index) => ({ category, index }))
    .sort((a, b) => a.category.sortOrder - b.category.sortOrder || a.index - b.index)
    .map(({ category }) => category);

const countProducts = (
  category: ProductCategoryDto,
  products: CategoryProduct[],
  rootName: string,
  parentName?: string,
): number => products.filter((product) => parentName
  ? product.category === category.name
    && (product.globalCategory === rootName || product.globalCategory === parentName)
  : product.globalCategory === category.name
).length;

const normalizeCategory = (
  category: ProductCategoryDto,
  products?: CategoryProduct[],
  rootName = category.name,
  parentName?: string,
): EquipmentCategory | null => {
  const productCount = products
    ? countProducts(category, products, rootName, parentName)
    : category.activeProductCount;
  const children = sortCategories(category.children ?? [])
    .map((child) => normalizeCategory(child, products, rootName, category.name))
    .filter((child): child is EquipmentCategory => child !== null);

  if ((!parentName && !category.anchor?.trim()) || productCount <= 0) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
    anchor: category.anchor ?? '',
    sortOrder: category.sortOrder,
    productCount,
    children,
  };
};

/**
 * Converts the public category tree into the sections the landing can render.
 * Product membership is authoritative when the product list is available;
 * the public active count keeps the header usable while its catalog is loading.
 */
export const normalizeEquipmentCategories = (
  categories: ProductCategoryDto[],
  products?: CategoryProduct[],
): EquipmentCategory[] => {
  const anchors = new Set<string>();

  return sortCategories(categories.filter((category) => !hasParent(category)))
    .map((category) => normalizeCategory(category, products))
    .filter((category): category is EquipmentCategory => {
      if (!category || anchors.has(category.anchor)) return false;
      anchors.add(category.anchor);
      return true;
    });
};

export const scrollToEquipmentHash = (hash: string, behavior: ScrollBehavior = 'smooth'): boolean => {
  const anchor = hash.replace(/^#/, '');
  if (!anchor) return false;

  const element = document.getElementById(anchor);
  if (!element) return false;

  element.scrollIntoView({ behavior, block: 'start' });
  return true;
};

export const scrollToEquipmentHashWhenReady = (
  hash: string,
  behavior: ScrollBehavior = 'smooth',
  maxAttempts = 60,
): (() => void) => {
  let attempts = 0;
  let frameId = 0;

  const attempt = () => {
    attempts += 1;
    if (scrollToEquipmentHash(hash, behavior) || attempts >= maxAttempts) return;
    frameId = window.requestAnimationFrame(attempt);
  };

  frameId = window.requestAnimationFrame(attempt);
  return () => window.cancelAnimationFrame(frameId);
};
