import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { locationOutline, callOutline, mailOutline } from 'ionicons/icons';
import styles from './ContactInfo.module.css';

const ADDRESS = 'Екатеринбург, ул. Лучистая 4';
const RUTUBE_LOGO_SRC = 'https://upload.wikimedia.org/wikipedia/commons/3/33/Rutube_logo.svg';
const RUTUBE_CHANNEL_URL = 'https://rutube.ru/channel/71449914/videos/';

const ContactInfo = () => {
  return (
    <section id="contact-info" className={styles.contactInfo}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Контактные данные</h2>
          <div className={styles.divider} />
        </div>
        
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard className={styles.contactCard}>
                <IonCardHeader>
                  <IonIcon icon={locationOutline} className={styles.icon} />
                  <IonCardTitle className={styles.cardTitle}>Адрес</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.text}>{ADDRESS}</p>
                  <p className={styles.addressNote}>Фактический и юридический адрес</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard className={styles.contactCard}>
                <IonCardHeader>
                  <IonIcon icon={callOutline} className={styles.icon} />
                  <IonCardTitle className={styles.cardTitle}>Телефоны</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className={styles.phoneList}>
                    <a href="tel:+79534293594" className={styles.phoneItem}>
                      <IonIcon icon={callOutline} className={styles.phoneIcon} />
                      <span className={styles.phoneNumber}>+7 953 429-35-94</span>
                    </a>
                    <a href="tel:+79122892265" className={styles.phoneItem}>
                      <IonIcon icon={callOutline} className={styles.phoneIcon} />
                      <span className={styles.phoneNumber}>+7 912 289-22-65</span>
                    </a>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard className={styles.contactCard}>
                <IonCardHeader>
                  <IonIcon icon={mailOutline} className={styles.icon} />
                  <IonCardTitle className={styles.cardTitle}>Email</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.text}>
                    <span className={styles.label}>Отдел продаж:</span>{' '}
                    <a href="mailto:sales@kitexp.ru" className={styles.link}>sales@kitexp.ru</a><br />
                    <span className={styles.label}>Общие вопросы:</span>{' '}
                    <a href="mailto:info@kitexp.ru" className={styles.link}>info@kitexp.ru</a>
                  </p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="12" sizeMd="6">
              <IonCard className={styles.contactCard}>
                <IonCardHeader>
                  <IonCardTitle className={styles.cardTitle}>Социальные сети</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className={styles.socialLinks}>
                    <a
                      href={RUTUBE_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="Rutube"
                    >
                      <img src={RUTUBE_LOGO_SRC} alt="Rutube" className={styles.rutubeLogo} />
                    </a>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};

export default ContactInfo;
