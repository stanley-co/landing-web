import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { shieldCheckmarkOutline, flashOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Features.module.css";

const items = [
  {
    title: "Умный автоматизированный вакуумный эмульгатор",
    desc: "Высокая безопасность · Интеллектуальный PLC · Точный контроль температуры · Мощное гомогенное смешивание материалов · Гигиеническая нержавеющая сталь",
    icon: shieldCheckmarkOutline,
    color: "primary",
    type: "Lotion Making Machine"
  },
  {
    title: "Высокоэффективный косметический вакуумный эмульгатор",
    desc: "GMP-стандартный дизайн · Широкая совместимость · Экономия труда · Автоматический контроль трубопровода · Обеспечивает стабильные эмульсии для постоянного качества",
    icon: flashOutline,
    color: "success",
    type: "Automatic Gel Making Machine"
  },
  {
    title: "Автоматическая машина для производства гелей",
    desc: "Использует передовые технологии вакуумной эмульгации для создания стабильных гелевых продуктов с постоянным качеством и однородностью",
    icon: checkmarkCircleOutline,
    color: "tertiary",
    type: "Vacuum Emulsifying Mixer"
  },
];

const Features = () => (
  <section id="display" className={styles.features}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>ОТЛИЧНАЯ ДЕМОНСТРАЦИЯ ПРОДУКЦИИ</h2>
      <IonGrid>
        <IonRow>
          {items.map((f, i) => (
            <IonCol size="12" sizeMd="4" key={i}>
              <IonCard className={styles.card}>
                <IonCardHeader>
                  <div className={styles.iconWrapper}>
                    <IonIcon icon={f.icon} className={styles.icon} />
                  </div>
                  <IonCardTitle className={styles.cardTitle}>{f.title}</IonCardTitle>
                  {f.type && <p className={styles.type}>ТИП: {f.type}</p>}
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.desc}>{f.desc}</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  </section>
);

export default Features;
