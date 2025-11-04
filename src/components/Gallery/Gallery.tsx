import { IonCard, IonGrid, IonRow, IonCol } from '@ionic/react';
import styles from "./Gallery.module.css";

const galleryItems = [
  { id: 1, title: "Производственная линия" },
  { id: 2, title: "Вакуумный эмульгатор" },
  { id: 3, title: "Смесительное оборудование" },
  { id: 4, title: "Система контроля качества" },
  { id: 5, title: "Автоматизация процесса" },
  { id: 6, title: "Сертификационное тестирование" },
];

const Gallery = () => (
  <section id="gallery" className={styles.gallery}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Галерея</h2>
      <IonGrid>
        <IonRow>
          {galleryItems.map((item) => (
            <IonCol size="12" sizeMd="6" sizeLg="4" key={item.id}>
              <IonCard className={styles.galleryCard}>
                <div className={styles.imagePlaceholder}>
                  <span>{item.title}</span>
                </div>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  </section>
);

export default Gallery;


