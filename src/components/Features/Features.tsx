import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { constructOutline, globeOutline, bulbOutline, peopleOutline } from 'ionicons/icons';
import styles from "./Features.module.css";

const items = [
  {
    title: "Точные технологии",
    desc: "Современные линии сборки и контроль качества. Использование передовых технологий в производстве промышленного оборудования.",
    icon: constructOutline,
    color: "primary"
  },
  {
    title: "Международный опыт",
    desc: "Экспорт в более чем 30 стран мира. Доказанная надежность и качество продукции на международном рынке.",
    icon: globeOutline,
    color: "success"
  },
  {
    title: "Инновации",
    desc: "Постоянные R&D разработки. Непрерывное совершенствование технологий и внедрение инновационных решений.",
    icon: bulbOutline,
    color: "tertiary"
  },
  {
    title: "Поддержка",
    desc: "Техническая консультация и сервис. Комплексная поддержка клиентов на всех этапах сотрудничества.",
    icon: peopleOutline,
    color: "warning"
  },
];

const Features = () => (
  <section id="display" className={styles.features}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Ключевые ценности</h2>
      <IonGrid>
        <IonRow>
          {items.map((f, i) => (
            <IonCol size="12" sizeMd="6" sizeLg="3" key={i}>
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
