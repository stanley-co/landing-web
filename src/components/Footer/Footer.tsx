import { IonTitle, IonButtons, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { logoLinkedin, paperPlaneOutline, mailOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import styles from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <div className={styles.footerSection}>
                <IonTitle className={styles.footerTitle}>Stanley-Co.</IonTitle>
                <p className={styles.description}>
                  Ведущий производитель машин для косметики и бытовой химии. 
                  Ваш эксперт по смесительным решениям.
                </p>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className={styles.footerSection}>
                <h3 className={styles.sectionTitle}>Быстрые ссылки</h3>
                <nav className={styles.nav}>
                  <button onClick={() => navigate('/')} className={styles.link}>Главная</button>
                  <button onClick={() => navigate('/equipment')} className={styles.link}>Оборудование</button>
                  <button onClick={() => navigate('/news')} className={styles.link}>Новости</button>
                  <button onClick={() => navigate('/contacts')} className={styles.link}>Контакты</button>
                </nav>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className={styles.footerSection}>
                <h3 className={styles.sectionTitle}>Контакты</h3>
                <div className={styles.contactInfo}>
                  <p><strong>Email:</strong> info@stanok-pro.ru</p>
                  <p><strong>Телефон:</strong> +7 922 507-02-32</p>
                </div>
                <IonButtons className={styles.socialButtons}>
                  <IonButton fill="clear" size="small">
                    <IonIcon icon={mailOutline} />
                  </IonButton>
                  <IonButton fill="clear" size="small">
                    <IonIcon icon={logoLinkedin} />
                  </IonButton>
                  <IonButton fill="clear" size="small">
                    <IonIcon icon={paperPlaneOutline} />
                  </IonButton>
                </IonButtons>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className={styles.bottomBar}>
          <p className={styles.rights}>© 2025 Stanley-Co. / Honemix. Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
