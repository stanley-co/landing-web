import { createContext, useContext } from 'react';
import type { ContentDetailDto, ProductDetailDto } from '../api/public';

export type DetailBootstrap = {
  kind: 'product' | 'content';
  id: string;
  version: number;
  dto: ProductDetailDto | ContentDetailDto;
};

declare global { interface Window { __DETAIL_BOOTSTRAP__?: DetailBootstrap; } }

const DetailBootstrapContext = createContext<DetailBootstrap | undefined>(undefined);
export const DetailBootstrapProvider = DetailBootstrapContext.Provider;

export function bootstrapFor(kind: DetailBootstrap['kind'], id: string): DetailBootstrap | undefined {
  if (typeof window === 'undefined') return undefined;
  const value = window.__DETAIL_BOOTSTRAP__;
  if (!value || value.kind !== kind || value.id !== id || !Number.isSafeInteger(value.version) || value.version < 0 || !value.dto) return undefined;
  return value;
}

/** Read-only during render: StrictMode may abandon and replay a render. */
export function consumeBootstrap(kind: DetailBootstrap['kind'], id: string): DetailBootstrap | undefined {
  return bootstrapFor(kind, id);
}

/** The server receives its approved DTO through React context; the browser consumes the serialized one. */
export function useDetailBootstrap(kind: DetailBootstrap['kind'], id: string): DetailBootstrap | undefined {
  const serverBootstrap = useContext(DetailBootstrapContext);
  if (serverBootstrap?.kind === kind && serverBootstrap.id === id) return serverBootstrap;
  return typeof window === 'undefined' ? undefined : consumeBootstrap(kind, id);
}

export function escapeBootstrap(value: DetailBootstrap): string {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => ({ '<': '\\u003c', '>': '\\u003e', '&': '\\u0026', '\u2028': '\\u2028', '\u2029': '\\u2029' })[character] ?? character);
}
