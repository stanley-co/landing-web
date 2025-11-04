import { IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { logoLinkedin, logoFacebook, mailOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <IonToolbar>
      <div className={styles.footerContent}>
        <IonTitle className={styles.footerTitle}>© 2025 СТАНОК ПРО</IonTitle>
        <p className={styles.rights}>Все права защищены</p>
        <IonButtons className={styles.socialButtons}>
          <IonButton fill="clear" size="small">
            <IonIcon icon={mailOutline} />
          </IonButton>
          <IonButton fill="clear" size="small">
            <IonIcon icon={logoLinkedin} />
          </IonButton>
          <IonButton fill="clear" size="small">
            <IonIcon icon={logoFacebook} />
          </IonButton>
        </IonButtons>
      </div>
    </IonToolbar>
  </footer>
);

export default Footer;
