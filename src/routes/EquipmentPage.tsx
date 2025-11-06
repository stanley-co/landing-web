import { IonContent, IonPage } from '@ionic/react';
import { useState, useMemo } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import EquipmentLayout from '../components/EquipmentLayout/EquipmentLayout';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import productsData from '../data/products.json';
import testImage from '../assets/images/test-image.png';

type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
};

const EquipmentPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Преобразуем данные и заменяем пути изображений
  const products: Product[] = useMemo(() => {
    return productsData.map(product => ({
      ...product,
      image: testImage // Используем локальное изображение
    }));
  }, []);

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


