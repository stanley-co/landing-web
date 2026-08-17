import { IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import ArticleBody from '../components/ArticleBody/ArticleBody';
import ArticleHero from '../components/ArticleHero/ArticleHero';
import ProductDescription from '../components/ProductDescription/ProductDescription';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import ProductSpecs from '../components/ProductSpecs/ProductSpecs';
import { trustedAdminDraft, type AdminPreviewDraft } from '../preview/adminPreviewBridge';

const adminOrigin = import.meta.env.VITE_ADMIN_PREVIEW_ORIGIN;
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect width="100%25" height="100%25" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" fill="%236b7280" font-family="sans-serif" font-size="28"%3E%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B5%20%D0%B2%D1%8B%D0%B1%D1%80%D0%B0%D0%BD%D0%BE%3C/text%3E%3C/svg%3E';

/**
 * Landing owns this route so previews use its real presentation components.
 * It accepts no URL payload and only processes messages from the explicitly
 * configured Admin origin; production public data routes are never involved.
 */
export default function AdminPreviewPage() {
  const [draft, setDraft] = useState<AdminPreviewDraft>();
  const rejected = !adminOrigin;

  useEffect(() => {
    const receive = (event: MessageEvent<unknown>) => {
      if (event.origin === adminOrigin && (event.data as { type?: string } | undefined)?.type === 'landing-admin-preview-request') {
        window.parent?.postMessage({ type: 'landing-admin-preview-ready' }, adminOrigin);
        return;
      }
      const nextDraft = trustedAdminDraft(event.origin, adminOrigin, event.data);
      if (nextDraft) setDraft(nextDraft);
    };
    window.addEventListener('message', receive);
    window.parent?.postMessage({ type: 'landing-admin-preview-ready' }, adminOrigin || window.location.origin);
    return () => window.removeEventListener('message', receive);
  }, []);

  if (rejected) return <IonPage><IonContent><p style={{ padding: 24 }}>Preview is disabled: VITE_ADMIN_PREVIEW_ORIGIN is not configured.</p></IonContent></IonPage>;
  if (!draft) return <IonPage><IonContent><p style={{ padding: 24 }}>Waiting for an Admin draft…</p></IonContent></IonPage>;
  const value = draft.value;
  const url = (...keys: string[]) => keys.map((key) => value[key]).find((candidate): candidate is string => typeof candidate === 'string' && candidate.trim() !== '') ?? placeholderImage;
  if (draft.kind === 'content') {
    const blocks = Array.isArray(value.blocks) ? value.blocks.map((block) => ({ ...(block as Record<string, unknown>), src: (block as Record<string, unknown>).imageUrl || (block as Record<string, unknown>).url || placeholderImage })) : [];
    return <IonPage><IonContent><ArticleHero title={String(value.title || 'Без названия')} date={String(value.date || new Date().toISOString().slice(0, 10))} category={String(value.category || 'Категория не выбрана')} image={url('imageUrl', 'image')} /><ArticleBody content={blocks as never} /></IonContent></IonPage>;
  }
  if (draft.kind === 'product') {
    const specs = Object.fromEntries((Array.isArray(value.specs) ? value.specs : []).map((item) => [String((item as Record<string, unknown>).name || ''), String((item as Record<string, unknown>).value || '')]));
    const images = Array.isArray(value.galleryImageUrls) ? value.galleryImageUrls.filter((item): item is string => typeof item === 'string') : [url('imageUrl', 'image')];
    return <IonPage><IonContent><ProductHeader name={String(value.name || 'Без названия')} category={String(value.categoryName || value.category || 'Категория не выбрана')} description={String(value.description || 'Краткое описание отсутствует')} /><ProductGallery images={images.length ? images : [placeholderImage]} productName={String(value.name || 'Без названия')} productId="preview" /><ProductDescription name={String(value.name || 'Без названия')} description={String(value.description || '')} fullDescription={String(value.fullDescription || value.description || 'Полное описание отсутствует')} advantages={Array.isArray(value.advantages) ? value.advantages as never : []} /><ProductSpecs specs={specs} /></IonContent></IonPage>;
  }
  return <IonPage><IonContent><section style={{ padding: 24 }}><img src={url('desktopImageUrl', 'desktopImage')} alt="Предпросмотр слайда" style={{ width: '100%', maxHeight: 480, objectFit: 'cover' }} /><h1>{String(value.title || 'Заголовок слайда')}</h1><p>{String(value.description || 'Описание слайда отсутствует')}</p><button type="button">{String(value.buttonText || value.actionValue || 'Кнопка')}</button></section></IonContent></IonPage>;
}
