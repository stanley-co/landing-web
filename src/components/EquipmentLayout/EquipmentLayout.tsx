import { IonGrid, IonRow, IonCol } from '@ionic/react';
import EquipmentFilter from '../EquipmentFilter/EquipmentFilter';
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
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  products: Product[];
  categoryCounts?: Record<string, number>;
  totalCount?: number;
};

const EquipmentLayout = ({
  categories,
  selectedCategory,
  onCategoryChange,
  products,
  categoryCounts = {},
  totalCount = 0
}: EquipmentLayoutProps) => {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <IonGrid>
          <IonRow>
            {/* Фильтр слева */}
            <IonCol size="12" sizeMd="4" sizeLg="3" className={styles.filterCol}>
              <EquipmentFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
                categoryCounts={categoryCounts}
                totalCount={totalCount}
              />
            </IonCol>
            
            {/* Сетка справа */}
            <IonCol size="12" sizeMd="8" sizeLg="9" className={styles.gridCol}>
              <EquipmentGrid products={products} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};

export default EquipmentLayout;

