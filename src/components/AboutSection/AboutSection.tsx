import { IonGrid, IonRow, IonCol, IonButton, IonImg, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../utils/fetchStaticData';
import styles from "./AboutSection.module.css";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <IonGrid>
          <IonRow className={styles.row}>
            <IonCol size="12" sizeMd="6">
              <div className={styles.imageContainer}>
                <IonImg src={getImageUrl("images/carousel/equipment-hero-1.jpg")} alt="Производственный цех" className={styles.image} />
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <div className={styles.content}>
                <h2 className={styles.title}>О компании</h2>
                <p className={styles.text}>
                  Honemix — ведущий производитель вакуумных эмульгаторов, миксеров и смесителей. 
                  Более 20 лет опыта в разработке и поставке оборудования для фармацевтической, 
                  косметической и пищевой промышленности.
                </p>
                <p className={styles.text}>
                  Наша компания специализируется на исследованиях, разработке, производстве, 
                  продаже и сервисном обслуживании оборудования для жидкостей, лосьонов, кремов, 
                  зубных паст и клеев. Мы развились в профессиональное предприятие, объединяющее 
                  научные исследования, производство, установку и сервис.
                </p>
                <IonButton 
                  color="primary" 
                  onClick={() => navigate('/equipment')}
                  className={styles.ctaButton}
                >
                  Подробнее об оборудовании
                  <IonIcon icon={arrowForwardOutline} slot="end" />
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};

export default AboutSection;

