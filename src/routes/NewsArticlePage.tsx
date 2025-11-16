import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ArticleHero from '../components/ArticleHero/ArticleHero';
import ArticleBody from '../components/ArticleBody/ArticleBody';
import ArticleShare from '../components/ArticleShare/ArticleShare';
import RelatedNews from '../components/RelatedNews/RelatedNews';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS, getImageUrl } from '../utils/fetchStaticData';
import type { News } from '../types/news';

type ContentBlock = {
  type: 'paragraph' | 'image' | 'quote';
  text?: string;
  src?: string;
  caption?: string;
};

type NewsArticle = {
  id: string;
  title: string;
  date: string;
  category?: string;
  image: string;
  preview: string;
  content: ContentBlock[];
};

const NewsArticlePage = () => {
  const { id } = useParams();
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
        console.error('[NewsArticlePage] Ошибка при загрузке новостей:', err);
        setError('Ошибка при загрузке статьи');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Находим статью по ID
  const article = useMemo(() => {
    const found = newsData.find(item => item.id === id);
    if (!found) return null;
    
    return {
      ...found,
      image: getImageUrl(found.image), // Используем реальное изображение из S3
      content: found.content.map(block => ({
        ...block,
        src: block.type === 'image' ? getImageUrl(block.src) : block.src
      }))
    } as NewsArticle;
  }, [id, newsData]);

  // Преобразуем все новости для RelatedNews (должно быть до условных возвратов)
  const allNews = useMemo(() => {
    return newsData.map(item => ({
      ...item,
      image: getImageUrl(item.image) // Используем реальные изображения из S3
    }));
  }, [newsData]);

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
              <p>Загрузка статьи...</p>
            </div>
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  // Показываем ошибку или сообщение о том, что статья не найдена
  if (error || !article) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <div style={{ padding: '80px 16px', textAlign: 'center' }}>
              <h2>Статья не найдена</h2>
              <p>{error || 'Запрашиваемая статья не существует.'}</p>
            </div>
            <CooperationFormSection />
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <IonPage>
      <PageWrapper>
        <IonContent>
          <ArticleHero
            title={article.title}
            date={article.date}
            category={article.category}
            image={article.image}
          />
          <ArticleBody content={article.content} />
          <ArticleShare title={article.title} url={shareUrl} />
          <RelatedNews news={allNews} currentId={article.id} />
          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default NewsArticlePage;


