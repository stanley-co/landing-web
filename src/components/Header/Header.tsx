import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { menuOutline, closeOutline, chevronDownOutline } from 'ionicons/icons';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef<HTMLIonHeaderElement>(null);
  const dropdownRefs = useRef<Record<string, { trigger: HTMLDivElement | null, dropdown: HTMLDivElement | null }>>({});

  // Закрываем выпадающие меню при изменении роута
  useEffect(() => {
    setActiveDropdown(null);
    setMenuOpen(false);
  }, [location.pathname]);

  // Закрываем выпадающее меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Проверяем, что клик не внутри header
      if (headerRef.current && !headerRef.current.contains(target)) {
        // Проверяем, что клик не внутри любого dropdown (рендерится через Portal в body)
        const clickedDropdown = Object.values(dropdownRefs.current).some(
          refs => refs.dropdown && refs.dropdown.contains(target)
        );
        
        // Проверяем, что клик не внутри триггера
        const clickedTrigger = Object.values(dropdownRefs.current).some(
          refs => refs.trigger && refs.trigger.contains(target)
        );
        
        if (!clickedDropdown && !clickedTrigger) {
          setActiveDropdown(null);
          // Очищаем все таймеры при клике вне меню
          Object.values(hoverTimeoutRef.current).forEach(clearTimeout);
          hoverTimeoutRef.current = {};
        }
      }
    };

    if (activeDropdown) {
      // Небольшая задержка для предотвращения закрытия при открытии
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [activeDropdown]);

  // Таймеры для задержки закрытия выпадающего меню
  const hoverTimeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Функция для проверки, является ли путь активным
  const isActivePath = (path: string): boolean => {
    if (path === '/equipment' || path === '/') {
      return location.pathname === '/equipment' || location.pathname === '/' || location.pathname.startsWith('/equipment/');
    }
    return location.pathname.startsWith(path);
  };

  const handleMenuClick = (path: string, anchor?: string) => {
    if (anchor) {
      // Добавляем hash в URL для правильной обработки якорей
      navigate(`${path}#${anchor}`);
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      navigate(path);
    }
    setMenuOpen(false);
    setActiveDropdown(null);
    // Очищаем все таймеры
    Object.values(hoverTimeoutRef.current).forEach(clearTimeout);
    hoverTimeoutRef.current = {};
  };

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleMouseEnter = (dropdown: string) => {
    // Очищаем таймер для этого выпадающего меню, если он есть
    if (hoverTimeoutRef.current[dropdown]) {
      clearTimeout(hoverTimeoutRef.current[dropdown]);
      delete hoverTimeoutRef.current[dropdown];
    }
    setActiveDropdown(dropdown);
    
    // Позиционируем dropdown через JS после рендеринга (с небольшой задержкой для portal)
    setTimeout(() => {
      const refs = dropdownRefs.current[dropdown];
      if (refs?.trigger && refs?.dropdown) {
        const rect = refs.trigger.getBoundingClientRect();
        refs.dropdown.style.top = `${rect.bottom + 4}px`;
        refs.dropdown.style.left = `${rect.left}px`;
      }
    }, 10);
  };

  const handleMouseLeave = (dropdown: string) => {
    // Добавляем задержку перед закрытием, чтобы пользователь мог перейти на выпадающее меню
    // Увеличиваем задержку, чтобы учесть время перемещения курсора
    hoverTimeoutRef.current[dropdown] = setTimeout(() => {
      setActiveDropdown((prev) => (prev === dropdown ? null : prev));
      delete hoverTimeoutRef.current[dropdown];
    }, 200);
  };

  // Очищаем таймеры при размонтировании
  useEffect(() => {
    return () => {
      Object.values(hoverTimeoutRef.current).forEach(clearTimeout);
    };
  }, []);

  // Обновляем позицию dropdown при скролле и ресайзе
  useEffect(() => {
    if (!activeDropdown) return;

    const updateDropdownPosition = () => {
      const refs = dropdownRefs.current[activeDropdown];
      if (refs?.trigger && refs?.dropdown) {
        const rect = refs.trigger.getBoundingClientRect();
        refs.dropdown.style.top = `${rect.bottom + 4}px`;
        refs.dropdown.style.left = `${rect.left}px`;
      }
    };

    updateDropdownPosition();
    window.addEventListener('scroll', updateDropdownPosition, true); // true = capture phase
    window.addEventListener('resize', updateDropdownPosition);

    return () => {
      window.removeEventListener('scroll', updateDropdownPosition, true);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [activeDropdown]);

  // Функция для преобразования названия категории в ID якоря (та же, что в EquipmentPage)
  const categoryToAnchorId = (category: string): string => {
    return category
      .toLowerCase()
      .replace(/[^а-яёa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Стандартные разделы оборудования (могут быть расширены через JSON)
  const equipmentSections = [
    { name: 'Оборудование для приготовления и хранения', anchor: categoryToAnchorId('Оборудование для приготовления и хранения') },
    { name: 'Фасовочное оборудование', anchor: categoryToAnchorId('Фасовочное оборудование') },
    { name: 'Насосное оборудование', anchor: categoryToAnchorId('Насосное оборудование') },
    { name: 'СИП станции', anchor: categoryToAnchorId('СИП станции') },
    { name: 'Лабораторное оборудование', anchor: categoryToAnchorId('Лабораторное оборудование') },
  ];

  const informationSections = [
    { name: 'Новости компании', anchor: 'news' },
    { name: 'Полезные статьи', anchor: 'articles' },
  ];

  const aboutSections = [
    { name: 'О нас', anchor: 'about-us' },
    { name: 'Наши компетенции', anchor: 'competences' },
    { name: 'Сертификаты', anchor: 'certificates' },
    { name: 'Наши клиенты', anchor: 'clients' },
  ];

  const contactsSections = [
    { name: 'Контактные данные', anchor: 'contact-info' },
    { name: 'Форма обратной связи', anchor: 'contact-form' },
  ];

  return (
    <IonHeader className={styles.header} ref={headerRef} style={{ zIndex: 999999 }}>
      <IonToolbar style={{ zIndex: 999999 }}>
        <div slot="start" className={styles.logoContainer}>
          <IonTitle className={styles.title} onClick={() => navigate('/equipment')}>СТАНОК ПРО</IonTitle>
          <div className={styles.tagline}>
            <span>Промышленное оборудование</span>
            <span>для производства</span>
          </div>
        </div>
        <IonButtons slot="end" className="ion-hide-md-up">
          <IonButton onClick={() => setMenuOpen(!menuOpen)}>
            <IonIcon icon={menuOpen ? closeOutline : menuOutline} />
          </IonButton>
        </IonButtons>
        <div slot="end" className={`${styles.nav} ion-hide-md-down`}>
          {/* Оборудование */}
          <div 
            ref={(el) => {
              if (!dropdownRefs.current['equipment']) dropdownRefs.current['equipment'] = { trigger: null, dropdown: null };
              dropdownRefs.current['equipment'].trigger = el;
            }}
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter('equipment')}
            onMouseLeave={() => handleMouseLeave('equipment')}
          >
            <IonButton 
              fill="clear" 
              onClick={() => handleMenuClick('/equipment')}
              className={`${styles.navButton} ${isActivePath('/equipment') ? styles.active : ''}`}
            >
              Оборудование
              <IonIcon icon={chevronDownOutline} slot="end" className={styles.chevron} />
            </IonButton>
            {activeDropdown === 'equipment' && createPortal(
              <div 
                ref={(el) => {
                  if (!dropdownRefs.current['equipment']) dropdownRefs.current['equipment'] = { trigger: null, dropdown: null };
                  dropdownRefs.current['equipment'].dropdown = el;
                  if (el) {
                    const refs = dropdownRefs.current['equipment'];
                    if (refs?.trigger) {
                      const rect = refs.trigger.getBoundingClientRect();
                      el.style.top = `${rect.bottom + 4}px`;
                      el.style.left = `${rect.left}px`;
                    }
                  }
                }}
                className={styles.dropdown}
                style={{ zIndex: 9999999 }}
                onMouseEnter={() => handleMouseEnter('equipment')}
                onMouseLeave={() => handleMouseLeave('equipment')}
              >
                {equipmentSections.map((section) => (
                  <button
                    key={section.anchor}
                    className={styles.dropdownItem}
                    onClick={() => handleMenuClick('/equipment', section.anchor)}
                  >
                    {section.name}
                  </button>
                ))}
              </div>,
              document.body
            )}
          </div>

          {/* Информация */}
          <div 
            ref={(el) => {
              if (!dropdownRefs.current['information']) dropdownRefs.current['information'] = { trigger: null, dropdown: null };
              dropdownRefs.current['information'].trigger = el;
            }}
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter('information')}
            onMouseLeave={() => handleMouseLeave('information')}
          >
            <IonButton 
              fill="clear" 
              onClick={() => handleMenuClick('/information')}
              className={`${styles.navButton} ${isActivePath('/information') ? styles.active : ''}`}
            >
              Новости и статьи
              <IonIcon icon={chevronDownOutline} slot="end" className={styles.chevron} />
            </IonButton>
            {activeDropdown === 'information' && createPortal(
              <div 
                ref={(el) => {
                  if (!dropdownRefs.current['information']) dropdownRefs.current['information'] = { trigger: null, dropdown: null };
                  dropdownRefs.current['information'].dropdown = el;
                  if (el) {
                    const refs = dropdownRefs.current['information'];
                    if (refs?.trigger) {
                      const rect = refs.trigger.getBoundingClientRect();
                      el.style.top = `${rect.bottom + 4}px`;
                      el.style.left = `${rect.left}px`;
                    }
                  }
                }}
                className={styles.dropdown}
                style={{ zIndex: 9999999 }}
                onMouseEnter={() => handleMouseEnter('information')}
                onMouseLeave={() => handleMouseLeave('information')}
              >
                {informationSections.map((section) => (
                  <button
                    key={section.anchor}
                    className={styles.dropdownItem}
                    onClick={() => handleMenuClick('/information', section.anchor)}
                  >
                    {section.name}
                  </button>
                ))}
              </div>,
              document.body
            )}
          </div>

          {/* О компании */}
          <div 
            ref={(el) => {
              if (!dropdownRefs.current['about']) dropdownRefs.current['about'] = { trigger: null, dropdown: null };
              dropdownRefs.current['about'].trigger = el;
            }}
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={() => handleMouseLeave('about')}
          >
            <IonButton 
              fill="clear" 
              onClick={() => handleMenuClick('/about')}
              className={`${styles.navButton} ${isActivePath('/about') ? styles.active : ''}`}
            >
              О компании
              <IonIcon icon={chevronDownOutline} slot="end" className={styles.chevron} />
            </IonButton>
            {activeDropdown === 'about' && createPortal(
              <div 
                ref={(el) => {
                  if (!dropdownRefs.current['about']) dropdownRefs.current['about'] = { trigger: null, dropdown: null };
                  dropdownRefs.current['about'].dropdown = el;
                  if (el) {
                    const refs = dropdownRefs.current['about'];
                    if (refs?.trigger) {
                      const rect = refs.trigger.getBoundingClientRect();
                      el.style.top = `${rect.bottom + 4}px`;
                      el.style.left = `${rect.left}px`;
                    }
                  }
                }}
                className={styles.dropdown}
                style={{ zIndex: 9999999 }}
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={() => handleMouseLeave('about')}
              >
                {aboutSections.map((section) => (
                  <button
                    key={section.anchor}
                    className={styles.dropdownItem}
                    onClick={() => handleMenuClick('/about', section.anchor)}
                  >
                    {section.name}
                  </button>
                ))}
              </div>,
              document.body
            )}
          </div>

          {/* Контакты */}
          <div 
            ref={(el) => {
              if (!dropdownRefs.current['contacts']) dropdownRefs.current['contacts'] = { trigger: null, dropdown: null };
              dropdownRefs.current['contacts'].trigger = el;
            }}
            className={styles.navItem}
            onMouseEnter={() => handleMouseEnter('contacts')}
            onMouseLeave={() => handleMouseLeave('contacts')}
          >
            <IonButton 
              fill="clear" 
              onClick={() => handleMenuClick('/contacts')}
              className={`${styles.navButton} ${isActivePath('/contacts') ? styles.active : ''}`}
            >
              Контакты
              <IonIcon icon={chevronDownOutline} slot="end" className={styles.chevron} />
            </IonButton>
            {activeDropdown === 'contacts' && createPortal(
              <div 
                ref={(el) => {
                  if (!dropdownRefs.current['contacts']) dropdownRefs.current['contacts'] = { trigger: null, dropdown: null };
                  dropdownRefs.current['contacts'].dropdown = el;
                  if (el) {
                    const refs = dropdownRefs.current['contacts'];
                    if (refs?.trigger) {
                      const rect = refs.trigger.getBoundingClientRect();
                      el.style.top = `${rect.bottom + 4}px`;
                      el.style.left = `${rect.left}px`;
                    }
                  }
                }}
                className={styles.dropdown}
                style={{ zIndex: 9999999 }}
                onMouseEnter={() => handleMouseEnter('contacts')}
                onMouseLeave={() => handleMouseLeave('contacts')}
              >
                {contactsSections.map((section) => (
                  <button
                    key={section.anchor}
                    className={styles.dropdownItem}
                    onClick={() => handleMenuClick('/contacts', section.anchor)}
                  >
                    {section.name}
                  </button>
                ))}
              </div>,
              document.body
            )}
          </div>

          <IonButton color="primary" onClick={() => handleMenuClick('/contacts', 'contact-form')} className={styles.ctaButton}>
            Оставить заявку
          </IonButton>
        </div>
      </IonToolbar>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={`${styles.mobileNavItem} ${isActivePath('/equipment') ? styles.active : ''}`}>
            <IonButton 
              fill="clear" 
              expand="block" 
              onClick={() => handleDropdownToggle('mobile-equipment')}
              className={isActivePath('/equipment') ? styles.active : ''}
            >
              Оборудование
              <IonIcon icon={chevronDownOutline} slot="end" />
            </IonButton>
            {activeDropdown === 'mobile-equipment' && (
              <div className={styles.mobileDropdown}>
                {equipmentSections.map((section) => (
                  <IonButton
                    key={section.anchor}
                    fill="clear"
                    expand="block"
                    className={styles.mobileDropdownItem}
                    onClick={() => handleMenuClick('/equipment', section.anchor)}
                  >
                    {section.name}
                  </IonButton>
                ))}
              </div>
            )}
          </div>

          <div className={`${styles.mobileNavItem} ${isActivePath('/information') ? styles.active : ''}`}>
            <IonButton 
              fill="clear" 
              expand="block" 
              onClick={() => handleDropdownToggle('mobile-information')}
              className={isActivePath('/information') ? styles.active : ''}
            >
              Новости и статьи
              <IonIcon icon={chevronDownOutline} slot="end" />
            </IonButton>
            {activeDropdown === 'mobile-information' && (
              <div className={styles.mobileDropdown}>
                {informationSections.map((section) => (
                  <IonButton
                    key={section.anchor}
                    fill="clear"
                    expand="block"
                    className={styles.mobileDropdownItem}
                    onClick={() => handleMenuClick('/information', section.anchor)}
                  >
                    {section.name}
                  </IonButton>
                ))}
              </div>
            )}
          </div>

          <div className={`${styles.mobileNavItem} ${isActivePath('/about') ? styles.active : ''}`}>
            <IonButton 
              fill="clear" 
              expand="block" 
              onClick={() => handleDropdownToggle('mobile-about')}
              className={isActivePath('/about') ? styles.active : ''}
            >
              О компании
              <IonIcon icon={chevronDownOutline} slot="end" />
            </IonButton>
            {activeDropdown === 'mobile-about' && (
              <div className={styles.mobileDropdown}>
                {aboutSections.map((section) => (
                  <IonButton
                    key={section.anchor}
                    fill="clear"
                    expand="block"
                    className={styles.mobileDropdownItem}
                    onClick={() => handleMenuClick('/about', section.anchor)}
                  >
                    {section.name}
                  </IonButton>
                ))}
              </div>
            )}
          </div>

          <div className={`${styles.mobileNavItem} ${isActivePath('/contacts') ? styles.active : ''}`}>
            <IonButton 
              fill="clear" 
              expand="block" 
              onClick={() => handleDropdownToggle('mobile-contacts')}
              className={isActivePath('/contacts') ? styles.active : ''}
            >
              Контакты
              <IonIcon icon={chevronDownOutline} slot="end" />
            </IonButton>
            {activeDropdown === 'mobile-contacts' && (
              <div className={styles.mobileDropdown}>
                {contactsSections.map((section) => (
                  <IonButton
                    key={section.anchor}
                    fill="clear"
                    expand="block"
                    className={styles.mobileDropdownItem}
                    onClick={() => handleMenuClick('/contacts', section.anchor)}
                  >
                    {section.name}
                  </IonButton>
                ))}
              </div>
            )}
          </div>

          <IonButton color="primary" expand="block" onClick={() => handleMenuClick('/contacts', 'contact-form')} className={styles.ctaButton}>
            Оставить заявку
          </IonButton>
        </div>
      )}
    </IonHeader>
  );
};

export default Header;
