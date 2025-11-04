import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonChip } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./ProductsSection.module.css";

const products = [
  { name: "Large Batch 2T/3T Lotion & Shampoo Making Machine", category: "Эмульгаторы" },
  { name: "Double Way Emulsifier Mixer for Cosmetics", category: "Миксеры" },
  { name: "Lifting Vacuum Toothpaste Ointment Produce Machine", category: "Специализированное" },
  { name: "1000L Double Jacket Liquid Detergent Mixer", category: "Резервуары" },
];

const ProductsSection = () => (
  <section id="products" className={styles.products}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Каталог продукции</h2>
      <IonGrid>
        <IonRow>
          {products.map((p, i) => (
            <IonCol size="12" sizeMd="6" sizeLg="3" key={i}>
              <IonCard className={styles.productCard}>
                <IonCardHeader>
                  <IonChip color="primary" className={styles.chip}>{p.category}</IonChip>
                  <IonCardTitle className={styles.productTitle}>{p.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton expand="block" fill="outline" className={styles.button}>
                    Подробнее
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
