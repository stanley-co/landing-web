import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonChip, IonImg } from '@ionic/react';
import { informationCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import productsData from '../../data/products.json';
import testImage from '../../assets/images/test-image.png';
import styles from "./ProductsPreview.module.css";

const ProductsPreview = () => {
  const navigate = useNavigate();

  // Берем первые 4 продукта из реальных данных
  const products = useMemo(() => {
    return productsData.slice(0, 4).map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      image: testImage
    }));
  }, []);

  return (
    <section id="products-preview" className={styles.productsPreview}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Каталог оборудования</h2>
        <IonGrid>
          <IonRow>
            {products.map((p) => (
              <IonCol size="12" sizeMd="6" sizeLg="3" key={p.id}>
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
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      className={styles.button}
                      onClick={() => navigate(`/equipment/${p.id}`)}
                    >
                      Подробнее
                      <IonIcon icon={informationCircleOutline} slot="end" />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <div className={styles.ctaContainer}>
          <IonButton 
            color="primary" 
            size="large"
            onClick={() => navigate('/equipment')}
            className={styles.ctaButton}
          >
            Смотреть всё оборудование
            <IonIcon icon={arrowForwardOutline} slot="end" />
          </IonButton>
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;

