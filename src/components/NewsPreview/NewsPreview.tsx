import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import newsData from '../../data/news.json';
import testImage from '../../assets/images/test-image.png';
import styles from "./NewsPreview.module.css";

const NewsPreview = () => {
  const navigate = useNavigate();

  // Берем последние 3 новости из реальных данных (сортируем по дате)
  const news = useMemo(() => {
    return [...newsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
      .map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.preview,
        image: testImage
      }));
  }, []);

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

