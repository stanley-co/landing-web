import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { shieldCheckmarkOutline, flashOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Features.module.css";

const items = [
  {
    title: "Smart Automated Vacuum Emulsifying Mixer",
    desc: "Высокая безопасность · Интеллектуальный PLC · Точный контроль температуры",
    icon: shieldCheckmarkOutline,
    color: "primary"
  },
  {
    title: "High Efficient Cosmetic Vacuum Emulsifier",
    desc: "GMP-дизайн · Широкая совместимость · Экономия труда · Автоматический трубопровод",
    icon: flashOutline,
    color: "success"
  },
  {
    title: "Automatic Gel Making Machine",
    desc: "Стабильная эмульсия и постоянное качество продукции",
    icon: checkmarkCircleOutline,
    color: "tertiary"
  },
];

const Features = () => (
  <section id="display" className={styles.features}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Продуктовые решения</h2>
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
