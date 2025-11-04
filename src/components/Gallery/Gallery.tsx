import { IonCard, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import testImage from '../../assets/images/test-image.png';
import styles from "./Gallery.module.css";

const galleryItems = [
  { id: 1, title: "Умный автоматизированный вакуумный эмульгатор в работе", description: "Производство косметических кремов", image: testImage },
  { id: 2, title: "Высокоэффективный косметический вакуумный эмульгатор", description: "GMP-стандартное оборудование", image: testImage },
  { id: 3, title: "Машина для производства лосьонов и шампуней 2T/3T", description: "Крупносерийное производство", image: testImage },
  { id: 4, title: "Двухсторонний эмульгатор-миксер для косметики", description: "Современное производство кремов", image: testImage },
  { id: 5, title: "Подъемная вакуумная машина для зубных паст", description: "Фармацевтическое оборудование", image: testImage },
  { id: 6, title: "1000л гомогенизатор-миксер для моющих средств", description: "Промышленное смешивание", image: testImage },
  { id: 7, title: "Производственная линия с автоматизацией", description: "Интегрированная система", image: testImage },
  { id: 8, title: "Резервуары из нержавеющей стали", description: "Санитарное оборудование", image: testImage },
  { id: 9, title: "Контроль качества продукции", description: "Тестирование и сертификация", image: testImage },
];

const Gallery = () => (
  <section id="gallery" className={styles.gallery}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>ГАЛЕРЕЯ</h2>
      <IonGrid>
        <IonRow>
          {galleryItems.map((item) => (
            <IonCol size="12" sizeMd="6" sizeLg="4" key={item.id}>
              <IonCard className={styles.galleryCard}>
                <div className={styles.imageContainer}>
                  <IonImg src={item.image} alt={item.title} className={styles.galleryImage} />
                  <div className={styles.overlay}>
                    <h3 className={styles.imageTitle}>{item.title}</h3>
                    <p className={styles.imageDescription}>{item.description}</p>
                  </div>
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


