import { IonChip, IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import styles from "./ProductHeader.module.css";
import PricePanel from '../PricePanel/PricePanel';

type ProductHeaderProps = {
  name: string;
  category: string;
  description: string;
  priceAmount?: number | null;
  priceCurrency?: 'RUB' | 'USD' | 'CNY' | null;
  priceDisplayMode?: 'EXACT' | 'FROM' | null;
  promotionText?: string | null;
  backButtonText?: string;
};

const ProductHeader = ({ name, category, description, priceAmount, priceCurrency, priceDisplayMode, promotionText, backButtonText = 'Назад к каталогу' }: ProductHeaderProps) => {
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
            <PricePanel amount={priceAmount} currency={priceCurrency} mode={priceDisplayMode} promotionText={promotionText} className={styles.detailPrice} />
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
