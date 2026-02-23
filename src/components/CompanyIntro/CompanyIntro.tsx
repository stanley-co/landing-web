import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonGrid, IonRow, IonCol, IonIcon, IonImg } from '@ionic/react';
import { shieldCheckmarkOutline, flaskOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { getImageUrl } from '../../utils/fetchStaticData';
import styles from "./CompanyIntro.module.css";

const COMPANY_IMAGE = 'images/carousel/production-lines.webp';

const CompanyIntro = () => (
  <section id="company" className={styles.company}>
    <div className={styles.container}>
      <div className={styles.introLayout}>
        <div className={styles.imageWrap}>
          <IonImg
            src={getImageUrl(COMPANY_IMAGE)}
            alt="Здание компании"
            className={styles.companyImage}
          />
        </div>
        <IonCard className={styles.introCard}>
          <IonCardHeader>
            <IonCardTitle className={styles.title}>О компании</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className={styles.description}>
              Наша компания разрабатывает инженерные и технологические решения для сквозных процессов «от склада до склада» с минимизацией потерь.
            </p>

            <p className={styles.descriptionHeading}>
              Основные направления работы:
            </p>
            <ul className={styles.descriptionList}>
              <li>
                инженерно-конструкторская проработка производственных линий по техническому заданию;
              </li>
              <li>
                технологическая проработка и оптимизация: производственных и складских процессов, использования ресурсов, систем мойки CIP и др.
              </li>
            </ul>

            <p className={styles.descriptionHeading}>
              Интеграция оборудования:
            </p>
            <ul className={styles.descriptionList}>
              <li>
                между машинами;
              </li>
              <li>
                с верхнеуровневыми системами (MES, ERP) — с полной автоматизацией производства;
              </li>
              <li>
                внедрение методологий учёта потерь и управления производством (подбираются индивидуально под задачи заказчика).
              </li>
            </ul>
            <div className={styles.certifications}>
              <IonChip color="primary">ISO 9001:20000</IonChip>
              <IonChip color="success">CE</IonChip>
              <IonChip color="tertiary">GMP</IonChip>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
      
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


