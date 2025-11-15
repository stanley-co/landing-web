import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonImg, IonChip, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import styles from "./NewsCard.module.css";

type NewsCardProps = {
  id: string;
  title: string;
  date: string;
  category?: string;
  image: string;
  preview: string;
};

const NewsCard = ({ id, title, date, category, image, preview }: NewsCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <IonCard className={styles.card}>
      <div className={styles.imageContainer}>
        <IonImg src={image} alt={title} className={styles.image} />
        <div className={styles.overlay}>
          {category && (
            <IonChip color="primary" className={styles.categoryChip}>
              {category}
            </IonChip>
          )}
        </div>
      </div>
      <IonCardHeader>
        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(date)}</span>
        </div>
        <IonCardTitle className={styles.title}>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p className={styles.preview}>{preview}</p>
        <IonButton 
          fill="clear" 
          onClick={() => navigate(`/news/${id}`)}
          className={styles.readButton}
        >
          Читать далее
          <IonIcon icon={arrowForwardOutline} slot="end" />
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default NewsCard;

