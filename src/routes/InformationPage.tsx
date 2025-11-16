import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useMemo, useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import NewsGrid from '../components/NewsGrid/NewsGrid';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS, getImageUrl } from '../utils/fetchStaticData';
import type { News } from '../types/news';
import styles from './InformationPage.module.css';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  category?: string;
  image: string;
  preview: string;
};

const InformationPage = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchStaticData<News[]>(S3_URLS.NEWS);
        setNewsData(data);
      } catch (err) {
        console.error('[InformationPage] Ошибка при загрузке новостей:', err);
        setError('Ошибка при загрузке новостей');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Преобразуем данные и используем реальные URL изображений из S3
  const news: NewsItem[] = useMemo(() => {
    return newsData.map(item => ({
      ...item,
      image: getImageUrl(item.image), // Используем реальные изображения из S3
    }));
  }, [newsData]);

  // Разделяем на новости и статьи
  // Новости: категории "События", "Производство", "Партнерство", "Продукты" и без категории
  const newsItems = useMemo(() => {
    const newsCategories = ['События', 'Производство', 'Партнерство', 'Продукты'];
    return news.filter(item => 
      !item.category || 
      newsCategories.includes(item.category) ||
      item.category.toLowerCase() === 'news'
    );
  }, [news]);

  // Статьи: категория "Статьи" или "article"
  const articles = useMemo(() => {
    return news.filter(item => 
      item.category?.toLowerCase() === 'article' || 
      item.category === 'Статьи'
    );
  }, [news]);

  // Сортируем по дате (новые сначала)
  const sortedNews = useMemo(() => {
    return [...newsItems].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [newsItems]);

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [articles]);

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <PageHero
              title="Информация"
              subtitle="Новости компании и полезные статьи"
              showCTA={false}
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
              <p>Загрузка информации...</p>
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
              title="Информация"
              subtitle="Новости компании и полезные статьи"
              showCTA={false}
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
            title="Информация"
            subtitle="Новости компании и полезные статьи"
            showCTA={false}
          />
          
          {/* Секция новостей */}
          <section id="news" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Новости компании</h2>
                <div className={styles.sectionDivider} />
                <p className={styles.sectionDescription}>
                  Узнайте о новых разработках, проектах и событиях, в которых мы участвуем
                </p>
              </div>
              {sortedNews.length > 0 ? (
                <NewsGrid news={sortedNews} />
              ) : (
                <div className={styles.emptyState}>
                  <p>Новости скоро появятся</p>
                </div>
              )}
            </div>
          </section>

          {/* Секция статей */}
          <section id="articles" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Полезные статьи</h2>
                <div className={styles.sectionDivider} />
                <p className={styles.sectionDescription}>
                  Информационные материалы, руководства и полезные советы для вашего бизнеса
                </p>
              </div>
              {sortedArticles.length > 0 ? (
                <NewsGrid news={sortedArticles} />
              ) : (
                <div className={styles.emptyState}>
                  <p>Статьи скоро появятся</p>
                </div>
              )}
            </div>
          </section>

          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default InformationPage;
