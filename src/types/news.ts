/**
 * Типы для новостей
 */

// Тип контента новости
export type NewsContentType = 'paragraph' | 'image' | 'quote';

// Интерфейс для элемента контента новости
export interface NewsContent {
  type: NewsContentType;
  text?: string;
  src?: string;
  caption?: string;
}

// Основной интерфейс новости
export interface News {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  preview: string;
  content: NewsContent[];
}

