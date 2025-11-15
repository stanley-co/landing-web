import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonChip, IonImg, IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import testImage from '../../assets/images/test-image.png';
import styles from "./ProductsSection.module.css";

const products = [
  { 
    name: "Машина для производства лосьонов и шампуней большой партией 2T/3T", 
    category: "Вакуумные эмульгаторы",
    description: "Профессиональное оборудование для крупносерийного производства косметических и гигиенических продуктов с вакуумной эмульгацией",
    image: testImage
  },
  { 
    name: "Двухсторонний эмульгатор-миксер для вакуумной косметики", 
    category: "Косметическое оборудование",
    description: "Современное оборудование для производства кремов и косметических эмульсий с двойным способом эмульгации",
    image: testImage
  },
  { 
    name: "Подъемная вакуумная машина для производства зубных паст и мазей", 
    category: "Фармацевтическое оборудование",
    description: "Вакуумный гомогенизатор-миксер для фармацевтической и косметической промышленности с подъемным механизмом",
    image: testImage
  },
  { 
    name: "1000л гомогенизатор-миксер для жидких моющих средств с двойной рубашкой", 
    category: "Резервуары и миксеры",
    description: "Промышленный миксер с двойной рубашкой для термостатирования и гомогенизации жидких моющих средств",
    image: testImage
  },
];

const ProductsSection = () => (
  <section id="products" className={styles.products}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>ЦЕНТР ПРОДУКЦИИ</h2>
      <IonGrid>
        <IonRow>
          {products.map((p, i) => (
            <IonCol size="12" sizeMd="6" sizeLg="3" key={i}>
              <IonCard className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <IonImg src={p.image} alt={p.name} className={styles.productImage} />
                </div>
                <IonCardHeader>
                  <IonChip color="primary" className={styles.chip}>{p.category}</IonChip>
                  <IonCardTitle className={styles.productTitle}>{p.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.productDescription}>{p.description}</p>
                  <IonButton expand="block" fill="outline" className={styles.button}>
                    Узнать больше
                    <IonIcon icon={informationCircleOutline} slot="end" />
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  </section>
);

export default ProductsSection;
