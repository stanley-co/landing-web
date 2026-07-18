import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonInput, IonItem, IonIcon, IonSpinner } from '@ionic/react';
import { searchOutline, closeOutline } from 'ionicons/icons';
import Modal from '../Modal/Modal';
import { landingApi, type ProductCardDto } from '../../api/public';
import styles from './SearchModal.module.css';

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductCardDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && searchQuery.trim().length >= 2) {
      const timer = window.setTimeout(() => {
      const loadProducts = async () => {
        try {
          setLoading(true);
          const data = await landingApi.products(searchQuery.trim());
          setProducts(data.items);
        } catch (err) {
          console.error('[SearchModal] Ошибка при загрузке продуктов:', err);
        } finally {
          setLoading(false);
        }
      };
      loadProducts();
      }, 300);
      return () => window.clearTimeout(timer);
    }
    setProducts([]);
  }, [isOpen, searchQuery]);

  // Сбрасываем поисковый запрос при закрытии
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredProducts = products;

  const handleProductClick = (productId: string) => {
    navigate(`/equipment/${productId}`);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Поиск оборудования"
      showCloseButton={true}
      closeOnBackdrop={true}
    >
      <div className={styles.searchContainer}>
        <IonItem className={styles.searchInputItem}>
          <IonIcon icon={searchOutline} slot="start" className={styles.searchIcon} />
          <IonInput
            type="text"
            placeholder="Введите название оборудования..."
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value || '')}
            className={styles.searchInput}
            autofocus={true}
          />
          {searchQuery && (
            <IonIcon 
              icon={closeOutline} 
              slot="end" 
              className={styles.clearIcon}
              onClick={() => setSearchQuery('')}
            />
          )}
        </IonItem>

        {loading && (
          <div className={styles.loadingContainer}>
            <IonSpinner name="crescent" />
            <p>Загрузка...</p>
          </div>
        )}

        {!loading && searchQuery.trim() && (
          <div className={styles.resultsContainer}>
            {filteredProducts.length > 0 ? (
              <>
                <div className={styles.resultsCount}>
                  Найдено: {filteredProducts.length}
                </div>
                <div className={styles.resultsList}>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={styles.resultItem}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className={styles.resultImage}>
                        <img 
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f0f0f0"/></svg>';
                          }}
                        />
                      </div>
                      <div className={styles.resultContent}>
                        <h3 className={styles.resultTitle}>{product.name}</h3>
                        <p className={styles.resultCategory}>{product.category}</p>
                        {product.description && (
                          <p className={styles.resultDescription}>
                            {product.description.length > 100 
                              ? `${product.description.substring(0, 100)}...` 
                              : product.description}
                          </p>
                        )}
                      </div>
                      <IonIcon icon={searchOutline} className={styles.resultArrow} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <IonIcon icon={searchOutline} className={styles.emptyIcon} />
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос</p>
              </div>
            )}
          </div>
        )}

        {!loading && !searchQuery.trim() && (
          <div className={styles.emptyState}>
            <IonIcon icon={searchOutline} className={styles.emptyIcon} />
            <h3>Введите запрос для поиска</h3>
            <p>Начните вводить название оборудования</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
