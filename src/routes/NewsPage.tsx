import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useMemo, useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import NewsGrid from '../components/NewsGrid/NewsGrid';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS } from '../utils/fetchStaticData';
import type { News } from '../types/news';
import testImage from '../assets/images/test-image.png';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  category?: string;
  image: string;
  preview: string;
};

const NewsPage = () => {
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
        console.error('[NewsPage] Ошибка при загрузке новостей:', err);
        setError('Ошибка при загрузке новостей');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Преобразуем данные и заменяем пути изображений
  const news: NewsItem[] = useMemo(() => {
    return newsData.map(item => ({
      ...item,
      image: testImage // Используем локальное изображение
    }));
  }, [newsData]);

  // Сортируем по дате (новые сначала)
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [news]);

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <PageHero
              title="Новости компании Stanley"
              subtitle="Узнайте о новых разработках, проектах и событиях, в которых мы участвуем"
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
              <p>Загрузка новостей...</p>
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
              title="Новости компании Stanley"
              subtitle="Узнайте о новых разработках, проектах и событиях, в которых мы участвуем"
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
            title="Новости компании Stanley"
            subtitle="Узнайте о новых разработках, проектах и событиях, в которых мы участвуем"
            showCTA={false}
          />
          <NewsGrid news={sortedNews} />
          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default NewsPage;


