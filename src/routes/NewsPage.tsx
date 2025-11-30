import { IonContent, IonPage, IonSpinner, IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import NewsGrid from '../components/NewsGrid/NewsGrid';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS, getImageUrl } from '../utils/fetchStaticData';
import type { News } from '../types/news';
import styles from './NewsPage.module.css';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  category?: string;
  image: string;
  preview: string;
};

const NewsPage = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchStaticData<News[]>(S3_URLS.NEWS);
        setNewsData(data);
      } catch (err) {
        console.error('[NewsPage] Ошибка при загрузке новостей:', err);
        setError('Ошибка при загрузке новостей');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Получаем уникальные категории
  const categories = useMemo(() => {
    const cats = newsData
      .map(item => item.category)
      .filter((cat): cat is string => !!cat);
    return Array.from(new Set(cats));
  }, [newsData]);

  // Преобразуем данные и используем реальные URL изображений из S3
  const news: NewsItem[] = useMemo(() => {
    return newsData.map(item => ({
      ...item,
      image: getImageUrl(item.image) // Используем реальные изображения из S3
    }));
  }, [newsData]);

  // Фильтруем и сортируем по дате (новые сначала)
  const filteredAndSortedNews = useMemo(() => {
    let filtered = news;
    
    if (selectedCategory) {
      filtered = news.filter(item => item.category === selectedCategory);
    }
    
    return [...filtered].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [news, selectedCategory]);

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <section className={styles.breadcrumbs}>
              <div className={styles.breadcrumbsContainer}>
                <IonButton
                  fill="clear"
                  onClick={() => navigate(-1)}
                  className={styles.backButton}
                >
                  <IonIcon icon={arrowBackOutline} slot="start" />
                  Назад
                </IonButton>
              </div>
            </section>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <IonSpinner name="crescent" style={{ width: '48px', height: '48px' }} />
              <p>Загрузка новостей...</p>
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
            <section className={styles.breadcrumbs}>
              <div className={styles.breadcrumbsContainer}>
                <IonButton
                  fill="clear"
                  onClick={() => navigate(-1)}
                  className={styles.backButton}
                >
                  <IonIcon icon={arrowBackOutline} slot="start" />
                  Назад
                </IonButton>
              </div>
            </section>
            <div style={{ padding: '40px 16px', textAlign: 'center' }}>
              <h2>Ошибка загрузки данных</h2>
              <p>{error}</p>
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
          {/* Хлебные крошки */}
          <section className={styles.breadcrumbs}>
            <div className={styles.breadcrumbsContainer}>
              <IonButton
                fill="clear"
                onClick={() => navigate(-1)}
                className={styles.backButton}
              >
                <IonIcon icon={arrowBackOutline} slot="start" />
                Назад
              </IonButton>
              <div className={styles.breadcrumbPath}>
                <span className={styles.breadcrumbItem}>О компании</span>
                <IonIcon icon={chevronForwardOutline} className={styles.breadcrumbSeparator} />
                <span className={styles.breadcrumbItemActive}>Новости</span>
              </div>
            </div>
          </section>

          {/* Заголовок страницы */}
          <section className={styles.pageHeader}>
            <div className={styles.headerContainer}>
              <h1 className={styles.pageTitle}>Новости</h1>
            </div>
          </section>
          
          {/* Фильтр по категориям */}
          {categories.length > 0 && (
            <section className={styles.filters}>
              <div className={styles.filtersContainer}>
                <IonButton
                  fill={selectedCategory === null ? 'solid' : 'clear'}
                  onClick={() => setSelectedCategory(null)}
                  className={styles.filterButton}
                >
                  Все
                </IonButton>
                {categories.map(category => (
                  <IonButton
                    key={category}
                    fill={selectedCategory === category ? 'solid' : 'clear'}
                    onClick={() => setSelectedCategory(category)}
                    className={styles.filterButton}
                  >
                    {category}
                  </IonButton>
                ))}
              </div>
            </section>
          )}
          
          <NewsGrid news={filteredAndSortedNews} />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default NewsPage;


