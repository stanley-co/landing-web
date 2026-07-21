import type { components } from './generated/schema';
import { apiResult, publicApi, publicGet } from './client';

export type ProductCardDto = components['schemas']['ProductCardDto'];
export type ProductDetailDto = components['schemas']['ProductDetailDto'];
export type ProductCategoryDto = components['schemas']['ProductCategoryDto'];
export type ContentListItemDto = components['schemas']['ContentListItemDto'];
export type ContentDetailDto = components['schemas']['ContentDetailDto'];
export type SlideDto = components['schemas']['SlideDto'];
export type PrivacyPolicyDto = components['schemas']['PrivacyPolicyDto'];
export type LeadCreateRequest = components['schemas']['LeadCreateRequest'];

export const landingApi = {
  products: (search?: string) => publicGet((signal) => publicApi.GET('/public/products', { params: { query: { search, page: 0, size: 100, sort: 'sortOrder' } }, signal })),
  product: (id: string) => publicGet((signal) => publicApi.GET('/public/products/{id}', { params: { path: { id } }, signal })),
  categories: () => publicGet((signal) => publicApi.GET('/public/product-categories', { signal })),
  content: (type?: 'NEWS' | 'ARTICLE') => publicGet((signal) => publicApi.GET('/public/content', { params: { query: { type, page: 0, size: 100 } }, signal })),
  contentItem: (id: string) => publicGet((signal) => publicApi.GET('/public/news/{id}', { params: { path: { id } }, signal })),
  slides: () => publicGet((signal) => publicApi.GET('/public/slides', { params: { query: { placement: 'EQUIPMENT_CATALOG' } }, signal })),
  privacyPolicy: () => publicGet((signal) => publicApi.GET('/public/legal/privacy-policy', { signal })),
  createLead: (body: LeadCreateRequest) => apiResult(publicApi.POST('/public/leads', { body }))
};
