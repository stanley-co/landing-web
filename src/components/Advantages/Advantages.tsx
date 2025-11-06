import { IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { timeOutline, shieldCheckmarkOutline, checkmarkCircleOutline, constructOutline } from 'ionicons/icons';
import styles from "./Advantages.module.css";

const advantages = [
  {
    icon: timeOutline,
    label: "20 лет на рынке",
    color: "primary"
  },
  {
    icon: shieldCheckmarkOutline,
    label: "Европейские стандарты ISO/CE",
    color: "success"
  },
  {
    icon: checkmarkCircleOutline,
    label: "Гарантия до 3 лет",
    color: "tertiary"
  },
  {
    icon: constructOutline,
    label: "Индивидуальные решения",
    color: "warning"
  },
];

const Advantages = () => (
  <section className={styles.advantages}>
    <div className={styles.container}>
      <IonGrid>
        <IonRow>
          {advantages.map((adv, i) => (
            <IonCol size="6" sizeMd="3" key={i}>
              <div className={styles.advantageItem}>
                <IonIcon icon={adv.icon} className={styles.icon} />
                <p className={styles.label}>{adv.label}</p>
              </div>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  </section>
);

export default Advantages;

