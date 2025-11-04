import { IonCard, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircleOutline, star } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Testimonials.module.css";

const testimonials = [
  { name: "ООО Прогресс", text: "Отличные станки, повысили производительность. Оборудование работает без сбоев уже более года.", rating: 5 },
  { name: "Завод №7", text: "Сервис и обучение на высоте. Сотрудники быстро освоили новое оборудование благодаря качественному обучению.", rating: 5 },
  { name: "Косметик-Про", text: "Вакуумные эмульгаторы превзошли ожидания. Качество продукции значительно улучшилось.", rating: 5 },
];

const Testimonials = () => (
  <section className={styles.testimonials}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Отзывы клиентов</h2>
      <IonGrid>
        <IonRow>
          {testimonials.map((t, i) => (
            <IonCol size="12" sizeMd="4" key={i}>
              <IonCard className={styles.card}>
                <IonCardContent>
                  <div className={styles.rating}>
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <IonIcon key={idx} icon={star} className={styles.star} />
                    ))}
                  </div>
                  <p className={styles.text}>"{t.text}"</p>
                  <div className={styles.author}>
                    <IonIcon icon={personCircleOutline} className={styles.avatar} />
                    <span className={styles.name}>— {t.name}</span>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  </section>
);

export default Testimonials;


