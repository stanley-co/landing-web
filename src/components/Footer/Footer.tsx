import { IonTitle, IonButtons, IonButton } from '@ionic/react';
import { logoLinkedin, logoFacebook, mailOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <IonTitle className={styles.footerTitle}>Brothers and Co., Ltd.</IonTitle>
      <p className={styles.description}>Ведущий РОССИЙСКИЙ производитель машин для косметики и бытовой химии. Ваш эксперт по смесительным решениям.</p>
      <div className={styles.contactInfo}>
        <p><strong>Адрес офиса:</strong> Китайская Москва</p>
        <p><strong>Телефон:</strong> +7 922 507-02-32</p>
        <p><strong>Email:</strong> fortune.coffee.derendyaev.ru</p>
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
  </footer>
);

export default Footer;
