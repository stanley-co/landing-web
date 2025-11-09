import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import ProductSpecs from '../components/ProductSpecs/ProductSpecs';
import ProductDescription from '../components/ProductDescription/ProductDescription';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS } from '../utils/fetchStaticData';
import type { Product } from '../types/product';
import testImage from '../assets/images/test-image.png';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchStaticData<Product[]>(S3_URLS.PRODUCTS);
        const foundProduct = products.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Продукт не найден');
        }
      } catch (err) {
        console.error('[ProductDetailPage] Ошибка при загрузке продукта:', err);
        setError('Ошибка при загрузке данных продукта');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [id]);

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
            <CooperationFormSection />
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  // Используем локальное изображение (можно расширить позже с реальными изображениями)
  const images = [testImage, testImage, testImage];

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
          <ProductSpecs specs={product.specs} />
          <ProductDescription
            name={product.name}
            description={product.description}
            fullDescription={product.fullDescription}
            advantages={product.advantages}
          />
          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default ProductDetailPage;


