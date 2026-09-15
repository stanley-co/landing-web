import { IonContent, IonPage, IonSpinner, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState, useMemo, useEffect, useRef } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import EquipmentCarousel from '../components/EquipmentCarousel/EquipmentCarousel';
import EquipmentFilter from '../components/EquipmentFilter/EquipmentFilter';
import EquipmentLayout from '../components/EquipmentLayout/EquipmentLayout';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { landingApi } from '../api/public';
import type { Product } from '../types/product';
import {
  loadEquipmentCategoryTree,
  normalizeEquipmentCategories,
  resolveProductGlobalCategory,
  scrollToEquipmentHashWhenReady,
  type EquipmentCategory,
} from '../utils/equipmentCategories';
import styles from './EquipmentPage.module.css';

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
  subcategories: { name: string; count: number }[];
  totalCount: number;
};

const EquipmentPage = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [categoriesData, setCategoriesData] = useState<EquipmentCategory[]>([]);
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
        const [productPage, categoryTree] = await Promise.all([landingApi.products(), loadEquipmentCategoryTree()]);
        const mappedProducts = productPage.items.map((product) => {
          const mappedProduct = {
            ...product,
            globalCategory: product.globalCategory ?? undefined,
            specs: {},
            fullDescription: product.description,
          };
          return {
            ...mappedProduct,
            globalCategory: resolveProductGlobalCategory(categoryTree, {
              ...mappedProduct,
              globalCategory: getGlobalCategory(mappedProduct),
            }),
          };
        });
        setProductsData(mappedProducts);
        setCategoriesData(normalizeEquipmentCategories(categoryTree, mappedProducts));
      } catch (err) {
        console.error('[EquipmentPage] Ошибка при загрузке продуктов:', err);
        setError('Ошибка при загрузке данных продуктов');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const products: Product[] = useMemo(() => productsData.map((product) => ({
    ...product,
    globalCategory: getGlobalCategory(product) || product.globalCategory
  })), [productsData]);

  // Создаем структуру категорий для единого фильтра
  const categoryStructure: CategoryStructure[] = useMemo(() => {
    return categoriesData.map((category) => {
      const sectionProducts = products.filter((product) => product.globalCategory === category.name);
      const subcategories = category.children.length > 0
        ? category.children.map((child) => ({ name: child.name, count: products.filter((product) => product.category === child.name && product.globalCategory === category.name).length }))
        : Array.from(new Set(sectionProducts.map((product) => product.category))).map((name) => ({
            name,
            count: sectionProducts.filter((product) => product.category === name).length,
          }));

      return {
        globalCategory: category.name,
        globalCategoryId: category.anchor,
        subcategories,
        totalCount: sectionProducts.length,
      };
    });
  }, [categoriesData, products]);

  useEffect(() => {
    if (loading) return;

    let cancelScroll = () => {};
    const scrollToHash = () => {
      cancelScroll();
      cancelScroll = scrollToEquipmentHashWhenReady(window.location.hash);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      cancelScroll();
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [loading, categoriesData]);

  // Инициализируем состояния фильтров для всех разделов
  useEffect(() => {
    const initialFilters: Record<string, string | null> = {};
    categoriesData.forEach(section => {
      initialFilters[section.anchor] = null;
    });
    setSelectedCategories(prev => ({
      ...prev,
      ...initialFilters,
    }));
  }, [categoriesData]);

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
  }, [categoriesData]);

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
      categoriesData.forEach(section => {
        resetFilters[section.anchor] = null;
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
  const hasSections = categoriesData.length > 0;
  const hasProducts = products.length > 0;

  return (
    <IonPage>
      <DocumentHead
        title="Оборудование — ФКИТ"
        description="Промышленное оборудование: вакуумные эмульгаторы, миксеры, дозаторы, насосы. Каталог и характеристики."
        canonicalPath="/equipment"
      />
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
                    {categoriesData.map((section) => {
                      const filteredProducts = getFilteredProductsForSection(section.anchor, section.name);

              return (
                        <section 
                          key={section.anchor}
                          id={section.anchor}
                          className={styles.equipmentSection}
                          ref={(el) => {
                            if (el) {
                              sectionRefs.current.set(section.anchor, el);
                            } else {
                              sectionRefs.current.delete(section.anchor);
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
