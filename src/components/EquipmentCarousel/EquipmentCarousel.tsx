import { IonImg, IonSpinner } from '@ionic/react';
import { useState, useEffect, useRef } from 'react';
import styles from './EquipmentCarousel.module.css';
import { fetchStaticData, S3_URLS, getImageUrl } from '../../utils/fetchStaticData';

type CarouselSlide = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const EquipmentCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        setLoading(true);
        const data = await fetchStaticData<CarouselSlide[]>(S3_URLS.CAROUSEL);
        // Преобразуем пути изображений в полные URL S3
        const slidesWithUrls = data.map(slide => ({
          ...slide,
          image: getImageUrl(slide.image)
        }));
        setSlides(slidesWithUrls);
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
              <IonImg src={slide.image} alt={slide.title} className={styles.image} />
              <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EquipmentCarousel;
