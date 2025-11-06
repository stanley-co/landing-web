import { IonButton, IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import styles from "./PageHero.module.css";

type PageHeroProps = {
  title: string;
  subtitle: string;
  showCTA?: boolean;
};

const PageHero = ({ title, subtitle, showCTA = false }: PageHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className={styles.pageHero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {showCTA && (
            <IonButton 
              color="light"
              size="large"
              onClick={() => navigate('/contacts')}
              className={styles.ctaButton}
            >
              <IonIcon icon={mailOutline} slot="start" />
              Связаться с нами
            </IonButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;

