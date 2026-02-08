import { IonImg, IonSpinner, IonButton, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EquipmentCarousel.module.css';
import { fetchStaticData, S3_URLS, getImageUrl } from '../../utils/fetchStaticData';
import { useContactFormModal } from '../../contexts/ContactFormModalContext';

type CarouselSlide = {
  id: number;
  image: string;
  title: string;
  description: string;
  link?: string;
  buttonText?: string;
};

const EquipmentCarousel = () => {
  const navigate = useNavigate();
  const { openModal: openContactForm } = useContactFormModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Обработка клика по ссылке
  const handleLinkClick = (link: string) => {
    // Специальная ссылка — открыть форму обратной связи в модальном окне
    if (link === '#contact-form') {
      openContactForm();
      return;
    }

    // Проверяем, является ли ссылка внешней (начинается с http:// или https://)
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }

    // Проверяем, содержит ли ссылка якорь (начинается с # или содержит #)
    if (link.includes('#')) {
      const [path, anchor] = link.split('#');
      const elementId = anchor || (link.startsWith('#') ? link.substring(1) : null);
      
      // Если ссылка начинается с #, это якорь без пути
      if (link.startsWith('#')) {
        // Пытаемся найти элемент на текущей странице
        const element = document.getElementById(elementId!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        
        // Если элемент не найден, переходим на /home с якорем
        navigate(`/home#${elementId}`);
        
        // Прокручиваем к элементу после загрузки страницы
        // Используем несколько попыток с увеличивающейся задержкой
        const scrollToElement = (attempts = 0) => {
          if (attempts > 10) return; // Максимум 10 попыток (5 секунд)
          
          setTimeout(() => {
            const targetElement = document.getElementById(elementId!);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              scrollToElement(attempts + 1);
            }
          }, 500 * (attempts + 1));
        };
        
        scrollToElement();
        return;
      }
      
      // Если есть путь с якорем (например, /home#about)
      if (path && elementId) {
        const targetPath = path || window.location.pathname;
        
        // Переходим на страницу
        navigate(targetPath);
        
        // Прокручиваем к элементу после загрузки страницы
        // Используем несколько попыток с увеличивающейся задержкой
        const scrollToElement = (attempts = 0) => {
          if (attempts > 10) return; // Максимум 10 попыток (5 секунд)
          
          setTimeout(() => {
            const targetElement = document.getElementById(elementId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              scrollToElement(attempts + 1);
            }
          }, 500 * (attempts + 1));
        };
        
        scrollToElement();
        return;
      }
    }

    // Внутренний маршрут без якоря - используем navigate
    navigate(link);
  };

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
              {slide.link && (
                <div className={styles.actionButtonWrapper}>
                  <IonButton
                    color="primary"
                    size="large"
                    className={styles.actionButton}
                    onClick={() => handleLinkClick(slide.link!)}
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
