import { IonTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
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
                <IonTitle className={styles.footerTitle}>ФКИТ</IonTitle>
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
                  <p><strong>Адрес:</strong> Екатеринбург, ул. Лучистая 4</p>
                  <p><strong>Телефоны:</strong> +7 915 013 36-09</p>
                  <p><strong>Отдел продаж:</strong> <a href="mailto:sales@kitexp.ru" className={styles.mailLink}>sales@kitexp.ru</a></p>
                  <p><strong>Общие вопросы:</strong> <a href="mailto:info@kitexp.ru" className={styles.mailLink}>info@kitexp.ru</a></p>
                </div>
                <div className={styles.socialButtons}>
                  <a href="https://rutube.ru/channel/71449914/videos/" target="_blank" rel="noopener noreferrer" className={styles.rutubeLink} aria-label="Rutube">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Rutube_logo.svg" alt="Rutube" className={styles.rutubeLogo} />
                  </a>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className={styles.bottomBar}>
          <p className={styles.rights}>© 2025 ФКИТ / Honemix. Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
