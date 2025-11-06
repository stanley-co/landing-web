import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import styles from "./RelatedNews.module.css";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  image: string;
  preview: string;
};

type RelatedNewsProps = {
  news: NewsItem[];
  currentId: string;
};

const RelatedNews = ({ news, currentId }: RelatedNewsProps) => {
  const navigate = useNavigate();

  // Фильтруем текущую новость и берем первые 3
  const relatedNews = news
    .filter(item => item.id !== currentId)
    .slice(0, 3);

  if (relatedNews.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className={styles.related}>
      <div className={styles.container}>
        <h2 className={styles.title}>Похожие новости</h2>
        <IonGrid>
          <IonRow>
            {relatedNews.map((item) => (
              <IonCol size="12" sizeMd="4" key={item.id}>
                <IonCard className={styles.card}>
                  <div className={styles.imageContainer}>
                    <IonImg src={item.image} alt={item.title} className={styles.image} />
                  </div>
                  <IonCardHeader>
                    <IonCardTitle className={styles.cardTitle}>{item.title}</IonCardTitle>
                    <span className={styles.date}>{formatDate(item.date)}</span>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className={styles.preview}>{item.preview}</p>
                    <IonButton
                      fill="clear"
                      onClick={() => navigate(`/news/${item.id}`)}
                      className={styles.readButton}
                    >
                      Читать далее
                      <IonIcon icon={arrowForwardOutline} slot="end" />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};

export default RelatedNews;

