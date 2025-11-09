import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useState, useMemo, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import EquipmentLayout from '../components/EquipmentLayout/EquipmentLayout';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS } from '../utils/fetchStaticData';
import type { Product } from '../types/product';
import testImage from '../assets/images/test-image.png';

const EquipmentPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchStaticData<Product[]>(S3_URLS.PRODUCTS);
        setProductsData(data);
      } catch (err) {
        console.error('[EquipmentPage] Ошибка при загрузке продуктов:', err);
        setError('Ошибка при загрузке данных продуктов');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Преобразуем данные и заменяем пути изображений
  const products: Product[] = useMemo(() => {
    return productsData.map(product => ({
      ...product,
      image: testImage // Используем локальное изображение
    }));
  }, [productsData]);

  // Получаем уникальные категории
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories;
  }, [products]);

  // Фильтруем продукты
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Подсчитываем количество продуктов по категориям
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <PageHero
              title="Каталог оборудования Stanley"
              subtitle="Вакуумные эмульгаторы, миксеры и специализированные линии для фармацевтики, косметики и пищевой промышленности"
              showCTA={true}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <IonSpinner name="crescent" style={{ width: '48px', height: '48px' }} />
              <p>Загрузка каталога оборудования...</p>
            </div>
            <CooperationFormSection />
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  // Показываем ошибку
  if (error) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <PageHero
              title="Каталог оборудования Stanley"
              subtitle="Вакуумные эмульгаторы, миксеры и специализированные линии для фармацевтики, косметики и пищевой промышленности"
              showCTA={true}
            />
            <div style={{ padding: '40px 16px', textAlign: 'center' }}>
              <h2>Ошибка загрузки данных</h2>
              <p>{error}</p>
            </div>
            <CooperationFormSection />
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
          <PageHero
            title="Каталог оборудования Stanley"
            subtitle="Вакуумные эмульгаторы, миксеры и специализированные линии для фармацевтики, косметики и пищевой промышленности"
            showCTA={true}
          />
          <EquipmentLayout
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            products={filteredProducts}
            categoryCounts={categoryCounts}
            totalCount={products.length}
          />
          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default EquipmentPage;


