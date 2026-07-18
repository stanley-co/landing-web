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

// Интерфейс для материалов и новостей продукта
export interface ProductMaterialsAndNews {
  video?: string; // URL видео на Rutube (например: "https://rutube.ru/video/...")
  articles?: string[]; // Массив ID статей для отображения (например: ["2025-01-optimization-guide"])
  atricles?: string[]; // Опечатка в данных (для обратной совместимости)
}

// Основной интерфейс продукта
export interface Product {
  id: string;
  externalId?: string | null;
  code?: string;
  name: string;
  globalCategory?: string; // Общая категория для распределения по разделам (Оборудование для приготовления и хранения, Фасовочное оборудование и т.д.)
  category: string; // Подкатегория (Вакуумные эмульгаторы, Планетарные миксеры и т.д.)
  image: string; // Главное изображение продукта
  galleryImages?: string[]; // Массив путей к изображениям для галереи (относительные пути из S3, например: "images/products/vm-01-1.jpg")
  description: string;
  specs: ProductSpecs;
  fullDescription: string;
  advantages?: ProductAdvantage[]; // Опциональное поле для преимуществ
  materialsAndNews?: ProductMaterialsAndNews; // Опциональное поле для видео и других материалов
}
