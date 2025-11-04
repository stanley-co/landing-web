import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';
import styles from "./FAQ.module.css";

const faqs = [
  { q: "Какие сроки поставки?", a: "Обычно 7–14 дней по России. Для индивидуальных заказов сроки могут варьироваться и согласовываются отдельно." },
  { q: "Есть ли обучение?", a: "Да, обучение персонала включено в стоимость. Мы проводим подробный инструктаж по эксплуатации и обслуживанию оборудования." },
  { q: "Какая гарантия предоставляется?", a: "На все оборудование предоставляется гарантия от 12 до 24 месяцев в зависимости от модели." },
  { q: "Возможна ли установка на вашем производстве?", a: "Да, мы предоставляем услуги по установке и запуску оборудования на месте у заказчика." },
];

const FAQ = () => (
  <section id="faq" className={styles.faq}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Часто задаваемые вопросы</h2>
      <IonAccordionGroup className={styles.accordionGroup}>
        {faqs.map((f, i) => (
          <IonAccordion key={i} value={`faq-${i}`}>
            <IonItem slot="header" className={styles.accordionItem}>
              <IonLabel className={styles.question}>{f.q}</IonLabel>
            </IonItem>
            <div slot="content" className={styles.answer}>
              <p>{f.a}</p>
            </div>
          </IonAccordion>
        ))}
      </IonAccordionGroup>
    </div>
  </section>
);

export default FAQ;


