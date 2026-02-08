import { IonContent, IonPage, IonSpinner, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState, useMemo, useEffect, useRef } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import EquipmentCarousel from '../components/EquipmentCarousel/EquipmentCarousel';
import EquipmentFilter from '../components/EquipmentFilter/EquipmentFilter';
import EquipmentLayout from '../components/EquipmentLayout/EquipmentLayout';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS, getImageUrl } from '../utils/fetchStaticData';
import type { Product } from '../types/product';
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

type CategoryStructure = {
  globalCategory: string;
  globalCategoryId: string;
  subcategories: {
    name: string;
    count: number;
  }[];
  totalCount: number;
};

const EquipmentPage = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Состояния для единого фильтра
  const [selectedGlobalCategory, setSelectedGlobalCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  
  // Состояния для фильтров каждой секции (для внутренней фильтрации)
  const [selectedCategories, setSelectedCategories] = useState<Record<string, string | null>>({});
  
  // Активная категория при скролле
  const [activeGlobalCategoryId, setActiveGlobalCategoryId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

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
        image: getImageUrl(product.image), // Используем изображение из S3
        globalCategory: globalCategory || product.globalCategory, // Добавляем globalCategory если определили
      };
      
      // Логируем для отладки, если globalCategory не определена
      if (!result.globalCategory) {
        console.warn(`[EquipmentPage] Продукт "${product.name}" (категория: "${product.category}") не имеет globalCategory и не найден в маппинге. Продукт не будет отображен.`);
      }
      
      return result;
    });
  }, [productsData]);

  // Определяем правильный порядок категорий (должен совпадать с порядком в Header)
  // Порядок: 1. Оборудование для приготовления и хранения, 2. Фасовочное оборудование,
  // 3. Насосное оборудование, 4. СИП станции, 5. Лабораторное оборудование
  const categoryOrder = useMemo(() => [
    'Оборудование для приготовления и хранения',
    'Фасовочное оборудование',
    'Насосное оборудование',
    'СИП станции',
    'Лабораторное оборудование',
    'Водоподготовка'
  ], []);

  // Получаем уникальные глобальные категории из продуктов (динамически)
  const globalCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach(product => {
      const globalCategory = product.globalCategory;
      if (globalCategory) {
        categories.add(globalCategory);
      }
    });
    // Сортируем категории по заданному порядку
    const sorted = Array.from(categories).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      // Если категория есть в порядке - используем её индекс, иначе ставим в конец
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
    return sorted;
  }, [products, categoryOrder]);

  // Создаем структуру разделов динамически на основе globalCategories
  const equipmentSections = useMemo(() => {
    return globalCategories.map(category => ({
      id: categoryToAnchorId(category),
      name: category,
    }));
  }, [globalCategories]);

  // Определяем порядок подкатегорий для каждой глобальной категории
  const getSubcategoryOrder = (globalCat: string): string[] => {
    const orders: Record<string, string[]> = {
      'Оборудование для приготовления и хранения': [
        'Вакуумные эмульгаторы',
        'Планетарные миксеры',
        'Реакторы / Промышленные смесители'
      ],
      'Фасовочное оборудование': [
        'Дозирующие системы',
        'Фасовочные автоматы',
        'Упаковочные линии'
      ],
      'Насосное оборудование': [
        'Центробежные насосы',
        'Поршневые насосы',
        'Винтовые насосы'
      ],
      'СИП станции': [
        'Мобильные СИП станции',
        'Стационарные СИП станции',
        'Компактные СИП станции'
      ],
      'Лабораторное оборудование': [
        'Лабораторные миксеры',
        'Лабораторные реакторы',
        'Лабораторные сушильные шкафы'
      ]
    };
    return orders[globalCat] || [];
  };

  // Создаем структуру категорий для единого фильтра
  const categoryStructure: CategoryStructure[] = useMemo(() => {
    return equipmentSections.map(section => {
      const globalCategory = section.name;
      const sectionProducts = products.filter(p => p.globalCategory === globalCategory);
      
      // Получаем подкатегории с количеством
      const subcategoryMap = new Map<string, number>();
      sectionProducts.forEach(product => {
        const count = subcategoryMap.get(product.category) || 0;
        subcategoryMap.set(product.category, count + 1);
      });

      const subcategoryOrder = getSubcategoryOrder(globalCategory);
      const subcategories = Array.from(subcategoryMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => {
          const indexA = subcategoryOrder.indexOf(a.name);
          const indexB = subcategoryOrder.indexOf(b.name);
          // Если подкатегория есть в порядке - используем её индекс, иначе ставим в конец
          if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });
      
      return {
        globalCategory,
        globalCategoryId: section.id,
        subcategories,
        totalCount: sectionProducts.length,
      };
    });
  }, [equipmentSections, products]);

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

  // Отслеживание активной категории при скролле
  useEffect(() => {
    // Очищаем предыдущий observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Вычисляем середину экрана для rootMargin
    const viewportHeight = window.innerHeight;
    const middlePoint = viewportHeight / 2;
    // rootMargin: отрицательный отступ сверху равен половине экрана,
    // чтобы срабатывать, когда элемент пересекает середину экрана
    const rootMarginTop = `-${middlePoint}px`;

    // Создаем новый IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const middleY = viewportHeight / 2;
        
        // Находим все видимые секции и вычисляем расстояние их начала (где находится заголовок) до середины экрана
        const sectionsWithDistance = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => {
            // Используем верхнюю границу секции (где находится заголовок)
            const sectionTop = entry.boundingClientRect.top;
            
            // Вычисляем расстояние от начала секции (заголовка) до середины экрана
            const distanceFromMiddle = Math.abs(sectionTop - middleY);
            
            return {
              id: entry.target.id,
              distance: distanceFromMiddle,
              top: sectionTop
            };
          })
          .sort((a, b) => {
            // Сначала сортируем по расстоянию до середины экрана
            if (Math.abs(a.distance - b.distance) > 10) {
              return a.distance - b.distance;
            }
            // Если расстояния близки, предпочитаем секцию, которая выше (при прокрутке вниз следующая категория активируется)
            return a.top - b.top;
          });

        if (sectionsWithDistance.length > 0) {
          // Берем секцию, заголовок которой ближе всего к середине экрана
          const activeSection = sectionsWithDistance[0];
          
          // Активируем категорию, если её заголовок находится в пределах видимости
          // (не слишком далеко от середины экрана - в пределах одного экрана)
          if (activeSection.distance < viewportHeight) {
            setActiveGlobalCategoryId(activeSection.id);
          }
        }
      },
      {
        rootMargin: `${rootMarginTop} 0px -50% 0px`,
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
      }
    );

    // Небольшая задержка для того, чтобы секции успели отрендериться
    const timer = setTimeout(() => {
      // Наблюдаем за всеми секциями
      sectionRefs.current.forEach((ref) => {
        if (ref && observerRef.current) {
          observerRef.current.observe(ref);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [equipmentSections]);

  // Функция для получения продуктов по глобальной категории
  const getProductsByGlobalCategory = (globalCategory: string): Product[] => {
    return products.filter(p => p.globalCategory === globalCategory);
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

  // Обработчик выбора категории/подкатегории в едином фильтре
  const handleCategorySelect = (globalCategoryId: string | null, subcategory: string | null) => {
    setSelectedGlobalCategory(globalCategoryId);
    setSelectedSubcategory(subcategory);
    
    // Если выбрана подкатегория, устанавливаем фильтр для соответствующей секции
    if (globalCategoryId && subcategory) {
      setSelectedCategories(prev => ({
        ...prev,
        [globalCategoryId]: subcategory,
      }));
    } else if (globalCategoryId) {
      // Если выбрана только категория, сбрасываем фильтр для этой секции
    setSelectedCategories(prev => ({
      ...prev,
        [globalCategoryId]: null,
      }));
    } else {
      // Если выбрано "Все категории", сбрасываем все фильтры
      const resetFilters: Record<string, string | null> = {};
      equipmentSections.forEach(section => {
        resetFilters[section.id] = null;
      });
      setSelectedCategories(resetFilters);
    }
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
            </div>
          ) : (
            <div id="catalog" className={styles.pageContainer}>
              <IonGrid>
                <IonRow>
                  {/* Единый фильтр слева */}
                  <IonCol size="12" sizeMd="4" sizeLg="3" className={styles.filterCol}>
                    <EquipmentFilter
                      categoryStructure={categoryStructure}
                      selectedGlobalCategory={selectedGlobalCategory}
                      selectedSubcategory={selectedSubcategory}
                      onCategorySelect={handleCategorySelect}
                      activeGlobalCategoryId={activeGlobalCategoryId}
                    />
                  </IonCol>
                  
                  {/* Контент справа */}
                  <IonCol size="12" sizeMd="8" sizeLg="9" className={styles.contentCol}>
                    {equipmentSections.map((section) => {
              const globalCategory = section.name;
                      const filteredProducts = getFilteredProductsForSection(section.id, globalCategory);
              const sectionProducts = getProductsByGlobalCategory(globalCategory);

              // Показываем секцию только если в ней есть продукты
              if (sectionProducts.length === 0) {
                return null;
              }

              return (
                        <section 
                          key={section.id} 
                          id={section.id} 
                          className={styles.equipmentSection}
                          ref={(el) => {
                            if (el) {
                              sectionRefs.current.set(section.id, el);
                            } else {
                              sectionRefs.current.delete(section.id);
                            }
                          }}
                        >
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{section.name}</h2>
                    <div className={styles.sectionDivider} />
                  </div>
                          <EquipmentLayout products={filteredProducts} />
                </section>
              );
                    })}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          )}

          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default EquipmentPage;
