import { IonImg, IonButton, IonIcon } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, expandOutline } from 'ionicons/icons';
import { useState, useRef } from 'react';
import styles from "./ProductGallery.module.css";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const displayImages = images.length > 0 ? images : [images[0] || ''];

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
        <div className={styles.mainImageWrapper}>
          <div
            ref={imageRef}
            className={`${styles.mainImage} ${isZoomed ? styles.zoomed : ''}`}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <IonImg 
              src={displayImages[selectedIndex]} 
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
    </section>
  );
};

export default ProductGallery;

