import { IonChip } from '@ionic/react';
import styles from "./ProductHeader.module.css";

type ProductHeaderProps = {
  name: string;
  category: string;
  description: string;
};

const ProductHeader = ({ name, category, description }: ProductHeaderProps) => {
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHeader;

