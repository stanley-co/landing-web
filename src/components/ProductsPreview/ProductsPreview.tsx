import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonChip, IonImg } from '@ionic/react';
import { informationCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import testImage from '../../assets/images/test-image.png';
import styles from "./ProductsPreview.module.css";

const products = [
  { 
    id: 1,
    name: "Вакуумный эмульгатор", 
    category: "Эмульгаторы",
    description: "Профессиональное оборудование для производства косметических и фармацевтических эмульсий",
    image: testImage
  },
  { 
    id: 2,
    name: "Планетарный миксер", 
    category: "Миксеры",
    description: "Современное оборудование для смешивания вязких и пастообразных продуктов",
    image: testImage
  },
  { 
    id: 3,
    name: "Гомогенизатор", 
    category: "Специализированное",
    description: "Высокоэффективное оборудование для гомогенизации различных продуктов",
    image: testImage
  },
  { 
    id: 4,
    name: "Резервуар с двойной рубашкой", 
    category: "Резервуары",
    description: "Промышленные резервуары для хранения и обработки жидкостей с термостатированием",
    image: testImage
  },
];

const ProductsPreview = () => {
  const navigate = useNavigate();

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

