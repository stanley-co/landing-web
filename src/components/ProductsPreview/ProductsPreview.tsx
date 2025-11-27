import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonChip, IonImg, IonSpinner, IonIcon } from '@ionic/react';
import { informationCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { fetchStaticData, S3_URLS, getImageUrl } from '../../utils/fetchStaticData';
import type { Product } from '../../types/product';
import styles from "./ProductsPreview.module.css";

const ProductsPreview = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchStaticData<Product[]>(S3_URLS.PRODUCTS);
        setProductsData(data);
      } catch (err) {
        console.error('[ProductsPreview] Ошибка при загрузке продуктов:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Берем первые 4 продукта из реальных данных
  const products = useMemo(() => {
    return productsData.slice(0, 4).map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      image: getImageUrl(product.image)
    }));
  }, [productsData]);

  if (loading) {
    return (
      <section id="products-preview" className={styles.productsPreview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Каталог оборудования</h2>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '200px'
          }}>
            <IonSpinner name="crescent" />
          </div>
        </div>
      </section>
    );
  }

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

