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
        <IonChip color="primary" className={styles.category}>
          {category}
        </IonChip>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};

export default ProductHeader;

