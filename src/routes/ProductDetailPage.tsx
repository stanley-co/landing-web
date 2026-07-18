import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import ProductSpecs from '../components/ProductSpecs/ProductSpecs';
import ProductDescription from '../components/ProductDescription/ProductDescription';
import ProductVideo from '../components/ProductVideo/ProductVideo';
import ProductRelatedArticles from '../components/ProductRelatedArticles/ProductRelatedArticles';
import Footer from '../components/Footer/Footer';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import { landingApi } from '../api/public';
import type { Product } from '../types/product';
import type { News } from '../types/news';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [articlesData, setArticlesData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Не указан идентификатор товара');
        const detail = await landingApi.product(id);
        const articles: News[] = (detail.relatedContent ?? []).flatMap((relation) => relation.summary ? [{
          ...relation.summary,
          category: relation.summary.category ?? '',
          content: []
        }] : []);
        const foundProduct: Product = {
          id: detail.id,
          externalId: detail.externalId,
          code: detail.code,
          name: detail.name,
          globalCategory: detail.globalCategory,
          category: detail.category,
          image: detail.image,
          galleryImages: detail.galleryImages ?? [],
          description: detail.description,
          fullDescription: detail.fullDescription ?? detail.description,
          specs: Object.fromEntries((detail.specs ?? []).sort((a, b) => a.sortOrder - b.sortOrder).map((spec) => [spec.name, spec.value])),
          advantages: (detail.advantages ?? []).sort((a, b) => a.sortOrder - b.sortOrder),
          materialsAndNews: {
            video: detail.videoUrl,
            articles: articles.map((article) => article.id)
          }
        };
        setProduct(foundProduct);
        setArticlesData(articles);
      } catch (err) {
        console.error('[ProductDetailPage] Ошибка при загрузке данных:', err);
        setError('Ошибка при загрузке данных продукта');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Получаем полезные статьи - фильтруем по ID из materialsAndNews.articles
  const relatedArticles = useMemo(() => {
    if (!product?.materialsAndNews) {
      return [];
    }

    // Поддерживаем оба варианта написания (articles и atricles - опечатка)
    const articleIds = product.materialsAndNews.articles || product.materialsAndNews.atricles || [];
    
    if (articleIds.length === 0) {
      return [];
    }

    // Фильтруем статьи по ID из массива
    const filtered = articlesData
      .filter(article => articleIds.includes(article.id))
      .map(item => ({ ...item }));

    return filtered;
  }, [articlesData, product]);

  // Используем изображения из S3 (галерея продукта)
  const images = useMemo(() => {
    if (!product) {
      console.log('[ProductDetailPage] No product, returning empty images array');
      return [];
    }
    
    console.log('[ProductDetailPage] Product loaded:', product.id);
    console.log('[ProductDetailPage] Product galleryImages:', product.galleryImages);
    console.log('[ProductDetailPage] Product image:', product.image);
    
    // Если есть galleryImages, используем их
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    
    // Иначе используем главное изображение
    return [product.image];
  }, [product]);

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <IonSpinner name="crescent" style={{ width: '48px', height: '48px' }} />
              <p>Загрузка данных продукта...</p>
            </div>
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  // Показываем ошибку или сообщение о том, что продукт не найден
  if (error || !product) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <div style={{ padding: '80px 16px', textAlign: 'center' }}>
              <h2>Оборудование не найдено</h2>
              <p>{error || 'Запрашиваемый продукт не существует.'}</p>
            </div>
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <DocumentHead
        title={`${product.name} — ФКИТ`}
        description={product.description}
        ogImage={product.galleryImages?.[0] ?? product.image}
        canonicalPath={`/equipment/${product.id}`}
      />
      <PageWrapper>
        <IonContent>
          <ProductHeader
            name={product.name}
            category={product.category}
            description={product.description}
          />
          <ProductGallery images={images} productName={product.name} productId={product.id} />
          <ProductDescription
            name={product.name}
            description={product.description}
            fullDescription={product.fullDescription}
            advantages={product.advantages}
          />
          <ProductSpecs specs={product.specs} />
          {product.materialsAndNews?.video && 
           typeof product.materialsAndNews.video === 'string' &&
           product.materialsAndNews.video.trim() !== '' && 
           product.materialsAndNews.video !== '-' && (
            <ProductVideo videoUrl={product.materialsAndNews.video} />
          )}
          {relatedArticles.length > 0 && (
            <ProductRelatedArticles articles={relatedArticles} />
          )}
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default ProductDetailPage;
