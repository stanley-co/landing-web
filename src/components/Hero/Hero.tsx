import { IonButton } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import styles from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Промышленное оборудование мирового уровня</h1>
          <p className={styles.subtitle}>
            Производство и поставка смесительных и эмульгирующих систем для фармацевтики, косметики и пищевой промышленности.
          </p>
          <IonButton 
            color="primary"
            size="large" 
            className={styles.cta}
            onClick={() => navigate('/equipment')}
          >
            Перейти в каталог
            <IonIcon icon={arrowForwardOutline} slot="end" />
          </IonButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
