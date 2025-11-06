import { IonButton, IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import styles from "./EquipmentCTA.module.css";

const EquipmentCTA = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Не нашли нужное оборудование?</h2>
          <p className={styles.subtitle}>
            Свяжитесь с нами, мы подберем оптимальное решение для вашего производства
          </p>
          <IonButton 
            color="primary"
            size="large"
            onClick={() => navigate('/contacts')}
            className={styles.ctaButton}
          >
            <IonIcon icon={mailOutline} slot="start" />
            Связаться с нами
          </IonButton>
        </div>
      </div>
    </section>
  );
};

export default EquipmentCTA;

