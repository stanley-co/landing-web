import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { locationOutline, callOutline, mailOutline, logoFacebook, logoWhatsapp, logoVk } from 'ionicons/icons';
import styles from './ContactInfo.module.css';

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
            <IonCol size="12" sizeMd="6" sizeLg="3">
              <IonCard className={styles.contactCard}>
                <IonCardHeader>
                  <IonIcon icon={locationOutline} className={styles.icon} />
                  <IonCardTitle className={styles.cardTitle}>Физический адрес</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.text}>г. Москва<br />ул. Примерная, д. 1</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="12" sizeMd="6" sizeLg="3">
              <IonCard className={styles.contactCard}>
                <IonCardHeader>
                  <IonIcon icon={locationOutline} className={styles.icon} />
                  <IonCardTitle className={styles.cardTitle}>Юридический адрес</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.text}>г. Москва<br />ул. Юридическая, д. 2</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="12" sizeMd="6" sizeLg="3">
              <IonCard className={styles.contactCard}>
                <IonCardHeader>
                  <IonIcon icon={locationOutline} className={styles.icon} />
                  <IonCardTitle className={styles.cardTitle}>Почтовый адрес</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.text}>123456, г. Москва<br />а/я 123</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="12" sizeMd="6" sizeLg="3">
              <IonCard className={styles.contactCard}>
                <IonCardHeader>
                  <IonIcon icon={callOutline} className={styles.icon} />
                  <IonCardTitle className={styles.cardTitle}>Телефоны</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.text}>
                    <a href="tel:+79991234567" className={styles.link}>+7 (999) 123-45-67</a><br />
                    <a href="tel:+79991234568" className={styles.link}>+7 (999) 123-45-68</a>
                  </p>
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
                    <a href="mailto:info@stanok-pro.ru" className={styles.link}>info@stanok-pro.ru</a><br />
                    <a href="mailto:sales@stanok-pro.ru" className={styles.link}>sales@stanok-pro.ru</a>
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
                    <a href="#" className={styles.socialLink} aria-label="Facebook">
                      <IonIcon icon={logoFacebook} />
                    </a>
                    <a href="#" className={styles.socialLink} aria-label="WhatsApp">
                      <IonIcon icon={logoWhatsapp} />
                    </a>
                    <a href="#" className={styles.socialLink} aria-label="VKontakte">
                      <IonIcon icon={logoVk} />
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
