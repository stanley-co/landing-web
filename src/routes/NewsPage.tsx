import { IonContent, IonPage } from '@ionic/react';
import { useMemo } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import NewsGrid from '../components/NewsGrid/NewsGrid';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import newsData from '../data/news.json';
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
  // Преобразуем данные и заменяем пути изображений
  const news: NewsItem[] = useMemo(() => {
    return newsData.map(item => ({
      ...item,
      image: testImage // Используем локальное изображение
    }));
  }, []);

  // Сортируем по дате (новые сначала)
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [news]);

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


