import { IonImg, IonButton, IonIcon } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, expandOutline, documentTextOutline } from 'ionicons/icons';
import { useState, useRef } from 'react';
import { useContactFormModal } from '../../contexts/ContactFormModalContext';
import styles from "./ProductGallery.module.css";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const { openModal } = useContactFormModal();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Логируем для отладки
  console.log('[ProductGallery] Received images:', images);
  console.log('[ProductGallery] Images count:', images?.length || 0);

  // Исправляем логику: если images пустой или undefined, возвращаем пустой массив, иначе используем images
  const displayImages = images && Array.isArray(images) && images.length > 0 ? images : [];
  
  // Если нет изображений, не рендерим галерею
  if (displayImages.length === 0) {
    console.warn('[ProductGallery] No images to display, returning null');
    return null;
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  const handleMouseLeave = () => {
    if (isZoomed) {
      setIsZoomed(false);
    }
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.galleryLayout}>
        <div className={styles.mainImageWrapper}>
          <div
            ref={imageRef}
            className={`${styles.mainImage} ${isZoomed ? styles.zoomed : ''}`}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <IonImg 
              src={displayImages[selectedIndex] || displayImages[0]} 
              alt={`${productName} - вид ${selectedIndex + 1}`}
              className={styles.image}
              style={isZoomed ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : {}}
            />
            {displayImages.length > 1 && (
              <>
                <IonButton
                  fill="clear"
                  className={styles.navButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                >
                  <IonIcon icon={chevronBackOutline} />
                </IonButton>
                <IonButton
                  fill="clear"
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  <IonIcon icon={chevronForwardOutline} />
                </IonButton>
              </>
            )}
            <IonButton
              fill="clear"
              className={styles.zoomButton}
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick();
              }}
            >
              <IonIcon icon={expandOutline} />
            </IonButton>
            {displayImages.length > 1 && (
              <div className={styles.counter}>
                {selectedIndex + 1} / {displayImages.length}
              </div>
            )}
            <IonButton
              color="primary"
              className={styles.ctaButton}
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
            >
              <IonIcon icon={documentTextOutline} slot="start" />
              Отправить заявку
            </IonButton>
          </div>
        </div>
        {displayImages.length > 1 && (
          <div className={styles.thumbnails}>
            {displayImages.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${selectedIndex === index ? styles.active : ''}`}
                onClick={() => setSelectedIndex(index)}
              >
                <IonImg src={image} alt={`${productName} - вид ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;

