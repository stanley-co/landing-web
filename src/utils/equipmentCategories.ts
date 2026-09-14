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

const sortCategories = (categories: ProductCategoryDto[]): ProductCategoryDto[] =>
  categories
    .map((category, index) => ({ category, index }))
    .sort((a, b) => a.category.sortOrder - b.category.sortOrder || a.index - b.index)
    .map(({ category }) => category);

const countProducts = (
  category: ProductCategoryDto,
  products: CategoryProduct[],
  isRoot: boolean,
): number => products.filter((product) => isRoot
  ? product.globalCategory === category.name
  : product.category === category.name
).length;

const normalizeCategory = (
  category: ProductCategoryDto,
  products?: CategoryProduct[],
  isRoot = false,
): EquipmentCategory | null => {
  const productCount = products ? countProducts(category, products, isRoot) : category.activeProductCount;
  const children = sortCategories(category.children ?? [])
    .map((child) => normalizeCategory(child, products, false))
    .filter((child): child is EquipmentCategory => child !== null);

  if ((isRoot && !category.anchor) || productCount <= 0) {
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
): EquipmentCategory[] =>
  sortCategories(categories)
    .map((category) => normalizeCategory(category, products, true))
    .filter((category): category is EquipmentCategory => category !== null);

export const scrollToEquipmentHash = (hash: string, behavior: ScrollBehavior = 'smooth'): boolean => {
  const anchor = hash.replace(/^#/, '');
  if (!anchor) return false;

  const element = document.getElementById(anchor);
  if (!element) return false;

  element.scrollIntoView({ behavior, block: 'start' });
  return true;
};
