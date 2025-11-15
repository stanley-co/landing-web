import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useState, useMemo, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import EquipmentCarousel from '../components/EquipmentCarousel/EquipmentCarousel';
import EquipmentLayout from '../components/EquipmentLayout/EquipmentLayout';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS } from '../utils/fetchStaticData';
import type { Product } from '../types/product';
import testImage from '../assets/images/test-image.png';
import styles from './EquipmentPage.module.css';

// Функция для преобразования названия категории в ID якоря
const categoryToAnchorId = (category: string): string => {
  return category
    .toLowerCase()
    .replace(/[^а-яёa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Маппинг категорий в globalCategory для обратной совместимости с данными из S3
// Если в данных из S3 нет поля globalCategory, оно будет определено автоматически на основе category
const categoryToGlobalCategoryMapping: Record<string, string> = {
  // Оборудование для приготовления и хранения
  'Вакуумные эмульгаторы': 'Оборудование для приготовления и хранения',
  'Планетарные миксеры': 'Оборудование для приготовления и хранения',
  'Реакторы / Промышленные смесители': 'Оборудование для приготовления и хранения',
  
  // Фасовочное оборудование
  'Дозирующие системы': 'Фасовочное оборудование',
  'Фасовочные автоматы': 'Фасовочное оборудование',
  'Упаковочные линии': 'Фасовочное оборудование',
  
  // Насосное оборудование
  'Центробежные насосы': 'Насосное оборудование',
  'Поршневые насосы': 'Насосное оборудование',
  'Винтовые насосы': 'Насосное оборудование',
  
  // СИП станции
  'Мобильные СИП станции': 'СИП станции',
  'Стационарные СИП станции': 'СИП станции',
  'Компактные СИП станции': 'СИП станции',
  
  // Лабораторное оборудование
  'Лабораторные миксеры': 'Лабораторное оборудование',
  'Лабораторные реакторы': 'Лабораторное оборудование',
  'Лабораторные сушильные шкафы': 'Лабораторное оборудование'
};

// Функция для получения globalCategory из продукта (с fallback на маппинг)
const getGlobalCategory = (product: Product): string | undefined => {
  // Если globalCategory уже есть, используем её
  if (product.globalCategory) {
    return product.globalCategory;
  }
  // Иначе используем маппинг на основе category
  return categoryToGlobalCategoryMapping[product.category];
};

const EquipmentPage = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Состояния для фильтров каждой секции (динамически создаются)
  const [selectedCategories, setSelectedCategories] = useState<Record<string, string | null>>({});

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

  // Преобразуем данные и заменяем пути изображений, добавляем globalCategory если отсутствует
  const products: Product[] = useMemo(() => {
    return productsData.map(product => {
      const globalCategory = getGlobalCategory(product);
      const result = {
        ...product,
        image: testImage, // Используем локальное изображение
        globalCategory: globalCategory || product.globalCategory, // Добавляем globalCategory если определили
      };
      
      // Логируем для отладки, если globalCategory не определена
      if (!result.globalCategory) {
        console.warn(`[EquipmentPage] Продукт "${product.name}" (категория: "${product.category}") не имеет globalCategory и не найден в маппинге. Продукт не будет отображен.`);
      }
      
      return result;
    });
  }, [productsData]);

  // Получаем уникальные глобальные категории из продуктов (динамически)
  const globalCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach(product => {
      const globalCategory = product.globalCategory;
      if (globalCategory) {
        categories.add(globalCategory);
      }
    });
    // Сортируем категории для стабильного порядка
    const sorted = Array.from(categories).sort();
    console.log(`[EquipmentPage] Найдено ${sorted.length} глобальных категорий:`, sorted);
    return sorted;
  }, [products]);

  // Создаем структуру разделов динамически на основе globalCategories
  const equipmentSections = useMemo(() => {
    return globalCategories.map(category => ({
      id: categoryToAnchorId(category),
      name: category,
    }));
  }, [globalCategories]);

  // Инициализируем состояния фильтров для всех разделов
  useEffect(() => {
    const initialFilters: Record<string, string | null> = {};
    equipmentSections.forEach(section => {
      initialFilters[section.id] = null;
    });
    setSelectedCategories(prev => ({
      ...prev,
      ...initialFilters,
    }));
  }, [equipmentSections]);

  // Функция для получения продуктов по глобальной категории
  const getProductsByGlobalCategory = (globalCategory: string): Product[] => {
    return products.filter(p => p.globalCategory === globalCategory);
  };

  // Получаем категории (подкатегории) для секции
  const getCategoriesForSection = (globalCategory: string): string[] => {
    const sectionProducts = getProductsByGlobalCategory(globalCategory);
    const categories = Array.from(new Set(sectionProducts.map(p => p.category)));
    return categories.sort();
  };

  // Фильтруем продукты для секции
  const getFilteredProductsForSection = (sectionId: string, globalCategory: string): Product[] => {
    const sectionProducts = getProductsByGlobalCategory(globalCategory);
    const selectedCategory = selectedCategories[sectionId];
    
    if (!selectedCategory) {
      return sectionProducts;
    }
    return sectionProducts.filter(p => p.category === selectedCategory);
  };

  // Подсчитываем количество продуктов по категориям для секции
  const getCategoryCountsForSection = (globalCategory: string): Record<string, number> => {
    const sectionProducts = getProductsByGlobalCategory(globalCategory);
    const counts: Record<string, number> = {};
    sectionProducts.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  };

  const handleCategoryChange = (sectionId: string, category: string | null) => {
    setSelectedCategories(prev => ({
      ...prev,
      [sectionId]: category,
    }));
  };

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <EquipmentCarousel />
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
            <EquipmentCarousel />
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

  // Проверяем, есть ли разделы для отображения
  const hasSections = equipmentSections.length > 0;
  const hasProducts = products.length > 0;

  return (
    <IonPage>
      <PageWrapper>
        <IonContent>
          <EquipmentCarousel />
          
          {!hasProducts ? (
            <div style={{ 
              padding: '80px 16px', 
              textAlign: 'center' 
            }}>
              <h2>Оборудование не найдено</h2>
              <p>Данные о продукции отсутствуют или не загружены.</p>
            </div>
          ) : !hasSections ? (
            <div style={{ 
              padding: '80px 16px', 
              textAlign: 'center' 
            }}>
              <h2>Нет доступных разделов</h2>
              <p>Не удалось определить категории оборудования. Проверьте данные в консоли браузера.</p>
              <details style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Информация для отладки</summary>
                <pre style={{ 
                  background: '#f5f5f5', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  overflow: 'auto',
                  marginTop: '10px',
                  fontSize: '12px'
                }}>
                  {JSON.stringify({ 
                    totalProducts: products.length,
                    productsWithGlobalCategory: products.filter(p => p.globalCategory).length,
                    uniqueCategories: Array.from(new Set(products.map(p => p.category))),
                    mapping: categoryToGlobalCategoryMapping
                  }, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            equipmentSections.map((section) => {
              const globalCategory = section.name;
              const sectionProducts = getProductsByGlobalCategory(globalCategory);
              const categories = getCategoriesForSection(globalCategory);
              const filteredProducts = getFilteredProductsForSection(section.id, globalCategory);
              const categoryCounts = getCategoryCountsForSection(globalCategory);
              const selectedCategory = selectedCategories[section.id];

              // Показываем секцию только если в ней есть продукты
              if (sectionProducts.length === 0) {
                return null;
              }

              return (
                <section key={section.id} id={section.id} className={styles.equipmentSection}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{section.name}</h2>
                    <div className={styles.sectionDivider} />
                  </div>
                  <EquipmentLayout
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(category) => handleCategoryChange(section.id, category)}
                    products={filteredProducts}
                    categoryCounts={categoryCounts}
                    totalCount={sectionProducts.length}
                  />
                </section>
              );
            })
          )}

          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default EquipmentPage;