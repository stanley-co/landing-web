import { IonButton, IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import styles from "./ContactCTA.module.css";

const ContactCTA = () => {
  const navigate = useNavigate();

  return (
    <section id="contact-cta" className={styles.contactCTA}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Готовы начать сотрудничество?</h2>
          <p className={styles.subtitle}>
            Свяжитесь с нами для консультации и получения персонального предложения
          </p>
          <IonButton 
            color="light"
            size="large"
            onClick={() => navigate('/contacts')}
            className={styles.ctaButton}
          >
            <IonIcon icon={mailOutline} slot="start" />
            Оставить заявку
          </IonButton>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;

