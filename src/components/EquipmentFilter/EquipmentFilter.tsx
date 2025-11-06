import { IonList, IonItem, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent } from '@ionic/react';
import { closeOutline, filterOutline } from 'ionicons/icons';
import { useState } from 'react';
import styles from "./EquipmentFilter.module.css";

type EquipmentFilterProps = {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categoryCounts?: Record<string, number>;
  totalCount?: number;
};

const EquipmentFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  categoryCounts = {},
  totalCount = 0
}: EquipmentFilterProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCategorySelect = (category: string | null) => {
    onCategoryChange(category);
    setModalOpen(false);
  };

  return (
    <>
      {/* Desktop: вертикальный фильтр слева */}
      <aside className={`${styles.filter} ${styles.desktopOnly}`} role="navigation" aria-label="Фильтр оборудования">
        <h3 className={styles.title}>Категории</h3>
        <IonList className={styles.list}>
          <IonItem
            button
            detail={false}
            onClick={() => onCategoryChange(null)}
            className={`${styles.item} ${selectedCategory === null ? styles.active : ''}`}
          >
            <div className={styles.itemContent}>
              <span>Все категории</span>
              {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
            </div>
          </IonItem>
          {categories.map((category) => {
            const count = categoryCounts[category] || 0;
            return (
              <IonItem
                key={category}
                button
                detail={false}
                onClick={() => onCategoryChange(category)}
                className={`${styles.item} ${selectedCategory === category ? styles.active : ''}`}
              >
                <div className={styles.itemContent}>
                  <span>{category}</span>
                  {count > 0 && <span className={styles.count}>{count}</span>}
                </div>
              </IonItem>
            );
          })}
        </IonList>
      </aside>

      {/* Mobile: кнопка фильтра */}
      <div className={styles.mobileOnly}>
        <IonButton
          fill="outline"
          expand="block"
          onClick={() => setModalOpen(true)}
          className={styles.filterButton}
        >
          <IonIcon icon={filterOutline} slot="start" />
          Фильтры
          {selectedCategory && (
            <span className={styles.badge}>
              {categoryCounts[selectedCategory] || 0}
            </span>
          )}
        </IonButton>

        <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Фильтры</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setModalOpen(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem
                button
                detail={false}
                onClick={() => handleCategorySelect(null)}
                className={selectedCategory === null ? styles.selectedItem : ''}
              >
                <div className={styles.itemContent}>
                  <span>Все категории</span>
                  {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
                </div>
              </IonItem>
              {categories.map((category) => {
                const count = categoryCounts[category] || 0;
                return (
                  <IonItem
                    key={category}
                    button
                    detail={false}
                    onClick={() => handleCategorySelect(category)}
                    className={selectedCategory === category ? styles.selectedItem : ''}
                  >
                    <div className={styles.itemContent}>
                      <span>{category}</span>
                      {count > 0 && <span className={styles.count}>{count}</span>}
                    </div>
                  </IonItem>
                );
              })}
            </IonList>
          </IonContent>
        </IonModal>
      </div>
    </>
  );
};

export default EquipmentFilter;

