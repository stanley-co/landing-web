import { IonCard, IonChip, IonButton, IonImg, IonIcon } from '@ionic/react';
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
    <IonCard className={styles.card} onClick={() => navigate(`/news/${id}`)}>
      <div className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <IonImg src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.textContent}>
          <div className={styles.header}>
            {category && (
              <IonChip color="primary" className={styles.categoryChip}>
                {category}
              </IonChip>
            )}
            <span className={styles.date}>{formatDate(date)}</span>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.preview}>{preview}</p>
          <IonButton 
            fill="clear" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/news/${id}`);
            }}
            className={styles.readButton}
          >
            Читать далее
            <IonIcon icon={arrowForwardOutline} slot="end" />
          </IonButton>
        </div>
      </div>
    </IonCard>
  );
};

export default NewsCard;

