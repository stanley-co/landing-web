import { IonImg } from '@ionic/react';
import { useState, useEffect, useRef } from 'react';
import styles from './EquipmentCarousel.module.css';
import testImage from '../../assets/images/test-image.png';

type CarouselSlide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    image: testImage,
    title: 'Промышленное оборудование мирового уровня',
    subtitle: 'Производство и поставка смесительных и эмульгирующих систем для фармацевтики, косметики и пищевой промышленности',
  },
  {
    id: 2,
    image: testImage,
    title: 'Вакуумные эмульгаторы Stanley',
    subtitle: 'Высокоточное оборудование для косметической и фармацевтической промышленности',
  },
  {
    id: 3,
    image: testImage,
    title: 'Производственные линии',
    subtitle: 'Автоматизированные системы для крупносерийного производства',
  },
];

const EquipmentCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Автоматическая смена слайдов каждые 5.5 секунд
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.carousel}>
      <div className={styles.carouselContainer}>
        {carouselSlides.map((slide, index) => (
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
              <p className={styles.subtitle}>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EquipmentCarousel;
