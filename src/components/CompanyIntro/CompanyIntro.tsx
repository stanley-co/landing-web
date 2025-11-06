import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonGrid, IonRow, IonCol } from '@ionic/react';
import { shieldCheckmarkOutline, flaskOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./CompanyIntro.module.css";

const CompanyIntro = () => (
  <section id="company" className={styles.company}>
    <div className={styles.container}>
      <IonCard className={styles.introCard}>
        <IonCardHeader>
          <IonCardTitle className={styles.title}>ABOUT US</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p className={styles.description}>
            Мы специализируемся на исследованиях, разработке, производстве, продаже и сервисном обслуживании 
            оборудования для жидкостей, лосьонов, кремов, зубных паст и клеев, таких как вакуумные эмульгаторы, 
            миксеры и фасовочные машины. Наша компания развилась в профессиональное предприятие, объединяющее 
            научные исследования, производство, установку и сервис. Мы всегда основывались на технологических 
            инновациях.
          </p>
          <p className={styles.description}>
            Наши сертификаты подтверждают соответствие международным стандартам качества и безопасности.
          </p>
          <div className={styles.certifications}>
            <IonChip color="primary">ISO9001:2000</IonChip>
            <IonChip color="success">CE</IonChip>
            <IonChip color="tertiary">GMP</IonChip>
          </div>
        </IonCardContent>
      </IonCard>
      
      <IonGrid className={styles.badgesGrid}>
        <IonRow>
          <IonCol size="12" sizeMd="4">
            <IonCard className={styles.badgeCard}>
              <IonCardContent>
                <IonIcon icon={shieldCheckmarkOutline} className={styles.badgeIcon} />
                <h3>Сертифицированное производство</h3>
                <p>Соответствие международным стандартам качества</p>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonCard className={styles.badgeCard}>
              <IonCardContent>
                <IonIcon icon={flaskOutline} className={styles.badgeIcon} />
                <h3>Тестирование продукции</h3>
                <p>Тщательное тестирование перед поставкой</p>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonCard className={styles.badgeCard}>
              <IonCardContent>
                <IonIcon icon={checkmarkCircleOutline} className={styles.badgeIcon} />
                <h3>Гарантия качества</h3>
                <p>Долгосрочная гарантия и сервисное обслуживание</p>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </section>
);

export default CompanyIntro;


