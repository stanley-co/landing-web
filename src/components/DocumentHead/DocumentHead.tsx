import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSiteUrl, getCanonicalUrl, DEFAULT_META } from '../../config/site';

export type DocumentHeadProps = {
  title?: string;
  description?: string;
  /** Полный URL изображения для og:image или относительный путь (будет склеен с getSiteUrl()). */
  ogImage?: string | null;
  /** og:type, по умолчанию "website". Для статей — "article". */
  ogType?: 'website' | 'article';
  /** Путь для canonical (например /equipment/123). Если не передан, берётся текущий pathname. */
  canonicalPath?: string | null;
  /** Не выставлять canonical (например для 404). */
  noCanonical?: boolean;
};

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"][data-dynamic]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    (el as HTMLLinkElement).setAttribute('data-dynamic', 'true');
    document.head.appendChild(el);
  }
  (el as HTMLLinkElement).href = href;
}

function removeCanonical() {
  const el = document.querySelector('link[rel="canonical"][data-dynamic]');
  if (el) el.remove();
}

export default function DocumentHead({
  title = DEFAULT_META.title,
  description = DEFAULT_META.description,
  ogImage = null,
  ogType = 'website',
  canonicalPath = null,
  noCanonical = false,
}: DocumentHeadProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    setMeta('description', description);

    const siteUrl = getSiteUrl();
    const url = canonicalPath !== null && canonicalPath !== undefined
      ? getCanonicalUrl(canonicalPath)
      : getCanonicalUrl(location.pathname);

    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:url', url, true);

    const imageUrl = ogImage
      ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
      : `${siteUrl}${DEFAULT_META.ogImagePath}`;
    setMeta('og:image', imageUrl, true);

    if (noCanonical) {
      removeCanonical();
    } else {
      setLink('canonical', url);
    }

    return () => {};
  }, [title, description, ogImage, ogType, canonicalPath, noCanonical, location.pathname]);

  return null;
}
