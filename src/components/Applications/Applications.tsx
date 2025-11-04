import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { businessOutline, flaskOutline, medicalOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Applications.module.css";

const items = [
  {
    title: "Вакуумные гомогенизаторы",
    text:
      "Вакуумная технология повышает стабильность и однородность эмульсий, сокращает трудозатраты.",
    icon: businessOutline,
    color: "primary"
  },
  {
    title: "Оборудование для жидкостей",
    text:
      "Гомогенизирующие смесители для шампуней и жидких средств обеспечивают воспроизводимость.",
    icon: flaskOutline,
    color: "success"
  },
  {
    title: "Санитарные резервуары",
    text:
      "Сосуды из нержавеющей стали для фарм-, косметической и пищевой отраслей.",
    icon: medicalOutline,
    color: "tertiary"
  },
];

const Applications = () => (
  <section id="applications" className={styles.applications}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Области применения</h2>
      <IonGrid>
        <IonRow>
          {items.map((i) => (
            <IonCol size="12" sizeMd="4" key={i.title}>
              <IonCard className={styles.card}>
                <IonCardHeader>
                  <div className={styles.iconWrapper}>
                    <IonIcon icon={i.icon} className={styles.icon} />
                  </div>
                  <IonCardTitle className={styles.cardTitle}>{i.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.text}>{i.text}</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  </section>
);

export default Applications;


