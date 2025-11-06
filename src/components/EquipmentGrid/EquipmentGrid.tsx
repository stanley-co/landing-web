import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import styles from "./EquipmentGrid.module.css";

type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
};

type EquipmentGridProps = {
  products: Product[];
};

const EquipmentGrid = ({ products }: EquipmentGridProps) => {
  const navigate = useNavigate();
  const [displayProducts, setDisplayProducts] = useState(products);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setDisplayProducts(products);
      setIsAnimating(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [products]);

  if (products.length === 0) {
    return (
      <section className={styles.grid}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>Оборудование не найдено</h3>
            <p className={styles.emptyText}>
              По вашему запросу ничего не найдено. Свяжитесь с нами — мы подберём решение под ваши задачи.
            </p>
            <IonButton 
              color="primary"
              onClick={() => navigate('/contacts')}
              className={styles.emptyButton}
            >
              <IonIcon icon={mailOutline} slot="start" />
              Связаться с нами
            </IonButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.grid}>
      <div className={styles.container}>
        <IonGrid>
          <IonRow className={isAnimating ? styles.animating : ''}>
            {displayProducts.map((product, index) => (
              <IonCol 
                size="12" 
                sizeMd="6" 
                sizeLg="4"
                key={product.id}
                className={styles.col}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <EquipmentCard
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  image={product.image}
                  description={product.description}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};

export default EquipmentGrid;

