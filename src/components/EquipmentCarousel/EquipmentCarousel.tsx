import { IonSpinner, IonButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import styles from './EquipmentCarousel.module.css';
import { landingApi, type SlideDto } from '../../api/public';
import { useContactFormModal } from '../../contexts/ContactFormModalContext';

const EquipmentCarousel = () => {
  const { openModal: openContactForm } = useContactFormModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<SlideDto[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const goToSlide = (index: number) => {
    resetAutoplay();
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    resetAutoplay();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    resetAutoplay();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const hasAction = (slide: SlideDto) => (
    slide.actionType === 'OPEN_FORM'
    || (slide.actionType === 'EXTERNAL_LINK' && Boolean(slide.actionValue?.trim()))
  );

  const handleAction = (slide: SlideDto) => {
    if (slide.actionType === 'OPEN_FORM') {
      openContactForm();
      return;
    }
    const value = slide.actionValue?.trim();
    if (slide.actionType === 'EXTERNAL_LINK') {
      if (!value) return;
      window.open(value, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        setLoading(true);
        // The public endpoint is the publication boundary; it returns only the
        // server-approved projection, never an administrative draft.
        setSlides((await landingApi.slides()).sort((a, b) => a.sortOrder - b.sortOrder));
      } catch (err) {
        console.error('[EquipmentCarousel] Ошибка при загрузке данных карусели:', err);
        // В случае ошибки используем пустой массив
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    loadCarouselData();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    // Автоматическая смена слайдов каждые 5.5 секунд
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length, currentSlide]);

  if (loading) {
    return (
      <section className={styles.carousel}>
        <div className={styles.carouselContainer}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <IonSpinner name="crescent" style={{ width: '48px', height: '48px' }} />
            <p style={{ color: 'white' }}>Загрузка карусели...</p>
          </div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className={styles.carousel}>
      <div className={styles.carouselContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''} ${
              index < currentSlide ? styles.prev : ''
            } ${index > currentSlide ? styles.next : ''}`}
          >
            <div className={styles.imageWrapper}>
              <picture><source media="(max-width: 767px)" srcSet={slide.mobileImage} /><img src={slide.desktopImage} alt={slide.title ?? ''} className={styles.image} /></picture>
              <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
              {slide.title && <h1 className={styles.title}>{slide.title}</h1>}
              {slide.description && <p className={styles.subtitle}>{slide.description}</p>}
              {hasAction(slide) && (
                <div className={styles.actionButtonWrapper}>
                  <IonButton
                    color="primary"
                    size="large"
                    className={styles.actionButton}
                    onClick={() => handleAction(slide)}
                  >
                    {slide.buttonText || (slide.actionType === 'OPEN_FORM' ? 'Оставить заявку' : 'Узнать больше')}
                    <IonIcon icon={arrowForwardOutline} slot="end" />
                  </IonButton>
                </div>
              )}
            </div>
          </div>
        ))}
        {slides.length > 1 && (
          <>
            <IonButton
              fill="clear"
              className={`${styles.navButton} ${styles.navButtonPrev}`}
              onClick={goToPrevious}
              aria-label="Предыдущий слайд"
            >
              <IonIcon icon={chevronBackOutline} />
            </IonButton>
            <IonButton
              fill="clear"
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={goToNext}
              aria-label="Следующий слайд"
            >
              <IonIcon icon={chevronForwardOutline} />
            </IonButton>
            <div className={styles.dots} role="tablist" aria-label="Навигация по слайдам">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
                  aria-selected={index === currentSlide}
                  role="tab"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default EquipmentCarousel;
