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
import { fetchStaticData, S3_URLS, getImageUrl } from '../utils/fetchStaticData';
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
        // Загружаем продукты и статьи параллельно
        const [products, articles] = await Promise.all([
          fetchStaticData<Product[]>(S3_URLS.PRODUCTS).catch(() => []),
          fetchStaticData<News[]>(S3_URLS.ARTICLES).catch(() => [])
        ]);
        
        const foundProduct = products.find(p => p.id === id);
        
        if (foundProduct) {
          console.log('[ProductDetailPage] Found product:', foundProduct.id);
          console.log('[ProductDetailPage] Product has galleryImages:', !!foundProduct.galleryImages);
          console.log('[ProductDetailPage] galleryImages count:', foundProduct.galleryImages?.length || 0);
          console.log('[ProductDetailPage] galleryImages data:', foundProduct.galleryImages);
          setProduct(foundProduct);
        } else {
          console.error('[ProductDetailPage] Product not found with id:', id);
          console.log('[ProductDetailPage] Available products:', products.map(p => p.id));
          setError('Продукт не найден');
        }
        
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

  // Получаем полезные статьи (первые 3)
  const relatedArticles = useMemo(() => {
    return articlesData
      .slice(0, 3)
      .map(item => ({
        ...item,
        image: getImageUrl(item.image)
      }));
  }, [articlesData]);

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
      const galleryUrls = product.galleryImages.map(img => {
        const url = getImageUrl(img);
        console.log('[ProductDetailPage] Converting gallery image:', img, '->', url);
        return url;
      });
      console.log('[ProductDetailPage] Final gallery URLs:', galleryUrls);
      return galleryUrls;
    }
    
    // Иначе используем главное изображение
    const mainImage = getImageUrl(product.image);
    console.log('[ProductDetailPage] No galleryImages, using main image:', mainImage);
    return [mainImage];
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
      <PageWrapper>
        <IonContent>
          <ProductHeader
            name={product.name}
            category={product.category}
            description={product.description}
          />
          <ProductGallery images={images} productName={product.name} />
          <ProductDescription
            name={product.name}
            description={product.description}
            fullDescription={product.fullDescription}
            advantages={product.advantages}
          />
          <ProductSpecs specs={product.specs} />
          {product.materialsAndNews?.video && (
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


