import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonImg, IonSpinner, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { fetchStaticData, S3_URLS, getImageUrl } from '../../utils/fetchStaticData';
import type { News } from '../../types/news';
import styles from "./NewsPreview.module.css";

const NewsPreview = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchStaticData<News[]>(S3_URLS.NEWS);
        setNewsData(data);
      } catch (err) {
        console.error('[NewsPreview] Ошибка при загрузке новостей:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Берем последние 3 новости из реальных данных (сортируем по дате)
  const news = useMemo(() => {
    return [...newsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
      .map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.preview,
        image: getImageUrl(item.image) // Используем реальные изображения из S3
      }));
  }, [newsData]);

  if (loading) {
    return (
      <section className={styles.newsPreview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Новости и статьи</h2>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '200px'
          }}>
            <IonSpinner name="crescent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.newsPreview}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Новости и статьи</h2>
        <IonGrid>
          <IonRow>
            {news.map((item) => (
              <IonCol size="12" sizeMd="4" key={item.id}>
                <IonCard className={styles.newsCard}>
                  <div className={styles.imageContainer}>
                    <IonImg src={item.image} alt={item.title} className={styles.newsImage} />
                  </div>
                  <IonCardHeader>
                    <IonCardTitle className={styles.newsTitle}>{item.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className={styles.excerpt}>{item.excerpt}</p>
                    <IonButton 
                      fill="clear" 
                      onClick={() => navigate(`/news/${item.id}`)}
                      className={styles.readButton}
                    >
                      Читать
                      <IonIcon icon={arrowForwardOutline} slot="end" />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <div className={styles.ctaContainer}>
          <IonButton 
            fill="outline"
            onClick={() => navigate('/news')}
            className={styles.ctaButton}
          >
            Все новости
            <IonIcon icon={arrowForwardOutline} slot="end" />
          </IonButton>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;

