/**
 * Типы для продуктов
 */

// Интерфейс для преимущества продукта
export interface ProductAdvantage {
  icon: string; // Имя иконки из ionicons (например, "shieldCheckmarkOutline")
  title: string;
  description: string;
}

// Интерфейс для спецификаций продукта
export interface ProductSpecs {
  [key: string]: string;
}

// Основной интерфейс продукта
export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  specs: ProductSpecs;
  fullDescription: string;
  advantages?: ProductAdvantage[]; // Опциональное поле для преимуществ
}

