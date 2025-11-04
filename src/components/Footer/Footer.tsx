import { IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { logoLinkedin, logoFacebook, mailOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <IonToolbar>
      <div className={styles.footerContent}>
        <IonTitle className={styles.footerTitle}>Guangzhou Hone Machinery Co., Ltd.</IonTitle>
        <p className={styles.description}>Ведущий китайский производитель машин для косметики и бытовой химии. Ваш эксперт по смесительным решениям.</p>
        <div className={styles.contactInfo}>
          <p><strong>Адрес офиса:</strong> No. 119, Gaozeng Avenue, Renhe Town, Baiyun District, Guangzhou City, China</p>
          <p><strong>Телефон:</strong> +86 18688638225</p>
          <p><strong>Email:</strong> info@honemix.com</p>
        </div>
        <p className={styles.rights}>© 2025 Guangzhou Hone Machinery Co., Ltd. Все права защищены</p>
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
