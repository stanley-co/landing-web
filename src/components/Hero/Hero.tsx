import { IonButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../utils/fetchStaticData';
import styles from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  const backgroundImageUrl = getImageUrl("images/carousel/equipment-hero-1.jpg");

  return (
    <section 
      id="home" 
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <img 
            src="/logo.svg" 
            alt="ФКИТ" 
            className={styles.logo}
          />
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
