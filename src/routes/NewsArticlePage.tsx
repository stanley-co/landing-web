import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ArticleHero from '../components/ArticleHero/ArticleHero';
import ArticleBody from '../components/ArticleBody/ArticleBody';
import ArticleShare from '../components/ArticleShare/ArticleShare';
import RelatedNews from '../components/RelatedNews/RelatedNews';
import Footer from '../components/Footer/Footer';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import { landingApi } from '../api/public';

type ContentBlock = {
  type: 'paragraph' | 'image' | 'quote' | 'link';
  text?: string;
  src?: string;
  caption?: string;
  url?: string;
  linkText?: string;
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
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Не указан идентификатор материала');
        const [detail, page] = await Promise.all([landingApi.contentItem(id), landingApi.content()]);
        setArticle({ ...detail, category: detail.category ?? '', content: detail.blocks ?? [] });
        setAllNews(page.items.map((item) => ({ ...item, category: item.category ?? '', content: [] })));
      } catch (err) {
        console.error('[NewsArticlePage] Ошибка при загрузке данных:', err);
        setError('Ошибка при загрузке статьи');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

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
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <IonPage>
      <DocumentHead
        title={`${article.title} — ФКИТ`}
        description={article.preview}
        ogType="article"
        ogImage={article.image}
        canonicalPath={`/news/${article.id}`}
      />
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
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default NewsArticlePage;

