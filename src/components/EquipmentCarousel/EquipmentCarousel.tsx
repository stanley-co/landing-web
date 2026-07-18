import { IonSpinner, IonButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EquipmentCarousel.module.css';
import { landingApi, type SlideDto } from '../../api/public';
import { useContactFormModal } from '../../contexts/ContactFormModalContext';

const EquipmentCarousel = () => {
  const navigate = useNavigate();
  const { openModal: openContactForm } = useContactFormModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<SlideDto[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Обработка клика по ссылке
  const handleAction = (slide: SlideDto) => {
    const value = slide.actionValue?.trim();
    if (!slide.actionType || !value) return;
    if (slide.actionType === 'OPEN_FORM') {
      openContactForm();
      return;
    }
    if (slide.actionType === 'EXTERNAL_LINK') {
      window.open(value, '_blank', 'noopener,noreferrer');
      return;
    }
    if (slide.actionType === 'ANCHOR') {
      const [path, anchor = ''] = value.split('#');
      if (!path || path === window.location.pathname) {
        document.getElementById(anchor || value.replace(/^#/, ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate(`${path}#${anchor}`);
      }
      return;
    }
    navigate(value);
  };

  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        setLoading(true);
        setSlides((await landingApi.slides()).filter((slide) => slide.active).sort((a, b) => a.sortOrder - b.sortOrder));
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
  }, [slides.length]);

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
              {slide.actionType && slide.actionValue && (
                <div className={styles.actionButtonWrapper}>
                  <IonButton
                    color="primary"
                    size="large"
                    className={styles.actionButton}
                    onClick={() => handleAction(slide)}
                  >
                    {slide.buttonText || 'Узнать больше'}
                    <IonIcon icon={arrowForwardOutline} slot="end" />
                  </IonButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EquipmentCarousel;
