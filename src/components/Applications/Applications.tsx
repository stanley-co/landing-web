import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { businessOutline, flaskOutline, medicalOutline } from 'ionicons/icons';
import styles from "./Applications.module.css";

const items = [
  {
    title: "Инновационные и интеллектуальные вакуумные гомогенизаторы",
    text:
      "Используя мощь вакуумной технологии, наш проект эмульгатора переопределяет отраслевые стандарты. Прощайте с трудоемкими процедурами и приветствуйте непревзойденную эффективность. Наш проект вакуумного эмульгатора позволяет достичь превосходных результатов за меньшее время, одновременно повышая однородность и стабильность формул, максимизируя производительность и прибыльность.",
    icon: businessOutline,
    color: "primary"
  },
  {
    title: "Лучшее оборудование для слияния жидкостей",
    text:
      "Компания бытовой химии ищет надежное решение для эмульгации активных ингредиентов в своих формулах шампуней. Наши гомогенизирующие миксеры для жидкостей доказали свою способность помочь достичь точных и последовательных эмульсий, упростить операции и обеспечить бесшовное сочетание универсальности и эффективности, гарантируя эффективность конечного продукта. В результате компании бытовой химии не только улучшают качество своей продукции, но и ускоряют процесс разработки.",
    icon: flaskOutline,
    color: "success"
  },
  {
    title: "Резервуары из нержавеющей стали с гарантией качества",
    text:
      "Хотя процесс хранения может показаться обманчиво простым, достижение тщательности требует непоколебимой преданности и соблюдения высочайших стандартов. Именно поэтому мы последовательно используем высококачественную санитарную нержавеющую сталь, идеально соответствующую строгим требованиям фармацевтической, косметической, пищевой промышленности и промышленности бытовой химии.",
    icon: medicalOutline,
    color: "tertiary"
  },
];

const Applications = () => (
  <section id="applications" className={styles.applications}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>ШИРОКИЙ СПЕКТР ПРИМЕНЕНИЙ</h2>
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


