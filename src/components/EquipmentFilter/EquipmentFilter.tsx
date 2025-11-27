import { IonList, IonItem, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonContent } from '@ionic/react';
import { closeOutline, filterOutline, chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import styles from "./EquipmentFilter.module.css";

type CategoryStructure = {
  globalCategory: string;
  globalCategoryId: string;
  subcategories: {
    name: string;
    count: number;
  }[];
  totalCount: number;
};

type EquipmentFilterProps = {
  categoryStructure: CategoryStructure[];
  selectedGlobalCategory: string | null;
  selectedSubcategory: string | null;
  onCategorySelect: (globalCategoryId: string | null, subcategory: string | null) => void;
  activeGlobalCategoryId: string | null;
};

const EquipmentFilter = ({ 
  categoryStructure,
  selectedGlobalCategory,
  selectedSubcategory,
  onCategorySelect,
  activeGlobalCategoryId
}: EquipmentFilterProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const filterRef = useRef<HTMLElement>(null);

  // Раскрываем категорию при выборе подкатегории
  useEffect(() => {
    if (selectedGlobalCategory) {
      setExpandedCategories(prev => new Set(prev).add(selectedGlobalCategory));
    }
  }, [selectedGlobalCategory]);

  // Раскрываем активную категорию при скролле и сворачиваем остальные
  useEffect(() => {
    if (activeGlobalCategoryId) {
      setExpandedCategories(prev => {
        const newSet = new Set<string>();
        // Оставляем раскрытой только активную категорию
        newSet.add(activeGlobalCategoryId);
        // Также оставляем раскрытой выбранную категорию, если она отличается от активной
        if (selectedGlobalCategory && selectedGlobalCategory !== activeGlobalCategoryId) {
          newSet.add(selectedGlobalCategory);
        }
        return newSet;
      });
    }
  }, [activeGlobalCategoryId, selectedGlobalCategory]);

  const toggleCategory = (globalCategoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(globalCategoryId)) {
        newSet.delete(globalCategoryId);
      } else {
        newSet.add(globalCategoryId);
      }
      return newSet;
    });
  };

  const handleGlobalCategoryClick = (globalCategoryId: string) => {
    // При клике на категорию - раскрываем/сворачиваем подкатегории
    toggleCategory(globalCategoryId);
    // Переходим к якорю категории
    const element = document.getElementById(globalCategoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubcategoryClick = (globalCategoryId: string, subcategory: string) => {
    onCategorySelect(globalCategoryId, subcategory);
    setModalOpen(false);
    
    // Переходим к якорю категории
    const element = document.getElementById(globalCategoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAllCategoriesClick = () => {
    onCategorySelect(null, null);
    setModalOpen(false);
    // Прокручиваем вверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop: вертикальный фильтр слева */}
      <aside 
        ref={filterRef}
        className={`${styles.filter} ${styles.desktopOnly}`} 
        role="navigation" 
        aria-label="Фильтр оборудования"
      >
        <h3 className={styles.title}>Категории</h3>
        <IonList className={styles.list}>
          <IonItem
            button
            detail={false}
            onClick={handleAllCategoriesClick}
            className={`${styles.item} ${selectedGlobalCategory === null ? styles.active : ''}`}
          >
            <div className={styles.itemContent}>
              <span>Все категории</span>
            </div>
          </IonItem>
          
          {categoryStructure.map((category) => {
            const isExpanded = expandedCategories.has(category.globalCategoryId);
            const isActive = activeGlobalCategoryId === category.globalCategoryId;
            const isSelected = selectedGlobalCategory === category.globalCategoryId;
            
            return (
              <div key={category.globalCategoryId} className={styles.categoryGroup}>
                <IonItem
                  button
                  detail={false}
                  onClick={() => handleGlobalCategoryClick(category.globalCategoryId)}
                  className={`${styles.categoryItem} ${isActive || isSelected ? styles.active : ''}`}
                >
                  <div className={styles.categoryContent}>
                    <IonIcon 
                      icon={isExpanded ? chevronDownOutline : chevronForwardOutline} 
                      className={styles.chevron}
                    />
                    <span className={styles.categoryName}>{category.globalCategory}</span>
                    <span className={styles.count}>{category.totalCount}</span>
                  </div>
                </IonItem>
                
                {isExpanded && (
                  <div className={styles.subcategories}>
                    {category.subcategories.map((subcategory) => {
                      const isSubcategorySelected = 
                        isSelected && selectedSubcategory === subcategory.name;
                      
                      return (
                        <IonItem
                          key={subcategory.name}
                          button
                          detail={false}
                          onClick={() => handleSubcategoryClick(category.globalCategoryId, subcategory.name)}
                          className={`${styles.subcategoryItem} ${isSubcategorySelected ? styles.active : ''}`}
                        >
                          <div className={styles.itemContent}>
                            <span>{subcategory.name}</span>
                            <span className={styles.count}>{subcategory.count}</span>
                          </div>
                        </IonItem>
                      );
                    })}
                  </div>
                )}
              </div>
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
          {(selectedGlobalCategory || selectedSubcategory) && (
            <span className={styles.badge}>1</span>
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
                onClick={handleAllCategoriesClick}
                className={selectedGlobalCategory === null ? styles.selectedItem : ''}
              >
                <div className={styles.itemContent}>
                  <span>Все категории</span>
                </div>
              </IonItem>
              
              {categoryStructure.map((category) => {
                const isExpanded = expandedCategories.has(category.globalCategoryId);
                const isSelected = selectedGlobalCategory === category.globalCategoryId;
                
                return (
                  <div key={category.globalCategoryId}>
                    <IonItem
                      button
                      detail={false}
                      onClick={() => toggleCategory(category.globalCategoryId)}
                      className={isSelected ? styles.selectedItem : ''}
                    >
                      <div className={styles.categoryContent}>
                        <IonIcon 
                          icon={isExpanded ? chevronDownOutline : chevronForwardOutline} 
                          className={styles.chevron}
                        />
                        <span className={styles.categoryName}>{category.globalCategory}</span>
                        <span className={styles.count}>{category.totalCount}</span>
                      </div>
                    </IonItem>
                    
                    {isExpanded && (
                      <div className={styles.subcategories}>
                        {category.subcategories.map((subcategory) => {
                          const isSubcategorySelected = 
                            isSelected && selectedSubcategory === subcategory.name;
                          
                          return (
                            <IonItem
                              key={subcategory.name}
                              button
                              detail={false}
                              onClick={() => handleSubcategoryClick(category.globalCategoryId, subcategory.name)}
                              className={isSubcategorySelected ? styles.selectedItem : ''}
                            >
                              <div className={styles.itemContent}>
                                <span>{subcategory.name}</span>
                                <span className={styles.count}>{subcategory.count}</span>
                              </div>
                            </IonItem>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
