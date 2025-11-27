import { IonGrid, IonRow, IonCol } from '@ionic/react';
import EquipmentGrid from '../EquipmentGrid/EquipmentGrid';
import styles from "./EquipmentLayout.module.css";

type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
};

type EquipmentLayoutProps = {
  products: Product[];
};

const EquipmentLayout = ({
  products
}: EquipmentLayoutProps) => {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <EquipmentGrid products={products} />
      </div>
    </section>
  );
};

export default EquipmentLayout;
