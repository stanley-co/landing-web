import { IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import styles from "./ArticleHero.module.css";

type ArticleHeroProps = {
  title: string;
  date: string;
  category?: string;
  image: string;
  backButtonText?: string;
};

const ArticleHero = ({ title, date, category, image, backButtonText = 'Вернуться к новостям' }: ArticleHeroProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className={styles.hero}>
      <div 
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {category && (
            <span className={styles.category}>{category}</span>
          )}
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span className={styles.date}>{formatDate(date)}</span>
            <IonButton
              fill="solid"
              className={styles.backButton}
              onClick={handleBack}
            >
              <IonIcon icon={arrowBackOutline} slot="start" />
              <span className={styles.backButtonText}>{backButtonText}</span>
            </IonButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;

