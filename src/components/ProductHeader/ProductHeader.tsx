import { IonChip, IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import styles from "./ProductHeader.module.css";

type ProductHeaderProps = {
  name: string;
  category: string;
  description: string;
  backButtonText?: string;
};

const ProductHeader = ({ name, category, description, backButtonText = 'Назад к каталогу' }: ProductHeaderProps) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h1 className={styles.title}>{name}</h1>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>
          <div className={styles.rightSection}>
            <IonChip color="primary" className={styles.category}>
              {category}
            </IonChip>
            <div className={styles.backButtonWrapper}>
              <IonButton
                fill="outline"
                color="medium"
                className={styles.backButton}
                onClick={handleBack}
              >
                <IonIcon icon={arrowBackOutline} slot="start" />
                {backButtonText}
              </IonButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHeader;

