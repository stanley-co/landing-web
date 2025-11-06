import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ArticleHero from '../components/ArticleHero/ArticleHero';
import ArticleBody from '../components/ArticleBody/ArticleBody';
import ArticleShare from '../components/ArticleShare/ArticleShare';
import RelatedNews from '../components/RelatedNews/RelatedNews';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import newsData from '../data/news.json';
import testImage from '../assets/images/test-image.png';

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

  // Находим статью по ID
  const article = useMemo(() => {
    const found = newsData.find(item => item.id === id);
    if (!found) return null;
    
    return {
      ...found,
      image: testImage, // Используем локальное изображение
      content: found.content.map(block => ({
        ...block,
        src: block.type === 'image' ? testImage : block.src
      }))
    } as NewsArticle;
  }, [id]);

  if (!article) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <div style={{ padding: '80px 16px', textAlign: 'center' }}>
              <h2>Статья не найдена</h2>
              <p>Запрашиваемая статья не существует.</p>
            </div>
            <CooperationFormSection />
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  // Преобразуем все новости для RelatedNews
  const allNews = useMemo(() => {
    return newsData.map(item => ({
      ...item,
      image: testImage
    }));
  }, []);

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


