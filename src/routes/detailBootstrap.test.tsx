import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ProductDetailPage from './ProductDetailPage';
import NewsArticlePage from './NewsArticlePage';

const api = vi.hoisted(() => ({ product: vi.fn(), contentItem: vi.fn(), content: vi.fn() }));
const passthrough = vi.hoisted(() => () => ({ default: ({ children, ...props }: { children?: string; [key: string]: unknown }) => `${JSON.stringify(props)}${children ?? ''}` }));
vi.mock('../api/public', () => ({ landingApi: api }));
vi.mock('@ionic/react', () => ({ IonContent: 'div', IonPage: 'div', IonSpinner: 'div' }));
vi.mock('../components/layout/PageWrapper', () => ({ default: ({ children }: { children?: React.ReactNode }) => children }));
vi.mock('../components/ProductHeader/ProductHeader', () => ({ default: ({ name, description }: { name: string; description: string }) => `${name} ${description}` }));
vi.mock('../components/ProductGallery/ProductGallery', passthrough);
vi.mock('../components/ProductSpecs/ProductSpecs', passthrough);
vi.mock('../components/ProductDescription/ProductDescription', () => ({ default: ({ fullDescription }: { fullDescription: string }) => fullDescription }));
vi.mock('../components/ProductVideo/ProductVideo', passthrough);
vi.mock('../components/ProductRelatedArticles/ProductRelatedArticles', passthrough);
vi.mock('../components/ArticleHero/ArticleHero', () => ({ default: ({ title }: { title: string }) => title }));
vi.mock('../components/ArticleBody/ArticleBody', () => ({ default: ({ content }: { content: Array<{ text?: string }> }) => content.map((block) => block.text ?? '').join(' ') }));
vi.mock('../components/ArticleShare/ArticleShare', passthrough);
vi.mock('../components/RelatedNews/RelatedNews', passthrough);
vi.mock('../components/Footer/Footer', passthrough);
vi.mock('../components/DocumentHead/DocumentHead', passthrough);

function shell(node: React.ReactNode, path: string, route: string) {
  return <MemoryRouter initialEntries={[path]}><Routes><Route path={route} element={node} /></Routes></MemoryRouter>;
}

afterEach(() => {
  delete window.__DETAIL_BOOTSTRAP__;
  document.body.replaceChildren();
});

describe('detail bootstrap hydration', () => {
  it('hydrates a Product projection before any detail API request', async () => {
    const id = '11111111-1111-4111-8111-111111111111';
    window.__DETAIL_BOOTSTRAP__ = {
      kind: 'product', id, version: 7,
      dto: { id, code: 'PRD-000001', name: 'Bootstrap product', category: 'Mixers', image: '/m.jpg', description: 'Bootstrap product description', fullDescription: 'Bootstrap product body', galleryImages: [], specs: [], advantages: [], relatedContent: [], approvedVersion: 7, publishedAt: '2026-09-27T00:00:00Z' },
    };
    const host = document.createElement('div');
    document.body.append(host);
    await act(async () => { createRoot(host).render(shell(<ProductDetailPage />, `/equipment/${id}`, '/equipment/:id')); });
    expect(host.textContent).toContain('Bootstrap product');
    expect(host.textContent).toContain('Bootstrap product body');
    expect(api.product).not.toHaveBeenCalled();
  });

  it('hydrates a Content projection before any detail API request', async () => {
    const id = '22222222-2222-4222-8222-222222222222';
    window.__DETAIL_BOOTSTRAP__ = {
      kind: 'content', id, version: 8,
      dto: { id, code: 'MAT-000001', type: 'NEWS', title: 'Bootstrap news', date: '2026-09-27', category: 'News', image: '/n.jpg', preview: 'Bootstrap news description', blocks: [{ type: 'paragraph', sortOrder: 0, text: 'Bootstrap news body' }], approvedVersion: 8, publishedAt: '2026-09-27T00:00:00Z' },
    };
    api.content.mockResolvedValue({ items: [] });
    const host = document.createElement('div');
    document.body.append(host);
    await act(async () => { createRoot(host).render(shell(<NewsArticlePage />, `/news/${id}`, '/news/:id')); });
    expect(host.textContent).toContain('Bootstrap news');
    expect(host.textContent).toContain('Bootstrap news body');
    expect(api.contentItem).not.toHaveBeenCalled();
  });
});
