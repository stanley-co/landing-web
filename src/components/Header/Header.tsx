import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton, IonIcon } from '@ionic/react';
import { menuOutline, closeOutline } from 'ionicons/icons';
import { useState } from 'react';
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <IonHeader className={styles.header}>
      <IonToolbar>
        <IonTitle className={styles.title}>СТАНОК ПРО</IonTitle>
        <IonButtons slot="end" className="ion-hide-md-up">
          <IonButton onClick={() => setMenuOpen(!menuOpen)}>
            <IonIcon icon={menuOpen ? closeOutline : menuOutline} />
          </IonButton>
        </IonButtons>
        <div slot="end" className={`${styles.nav} ion-hide-md-down`}>
          <IonButton fill="clear" onClick={() => scrollToSection('home')}>Главная</IonButton>
          <IonButton fill="clear" onClick={() => scrollToSection('display')}>Продуктовые решения</IonButton>
          <IonButton fill="clear" onClick={() => scrollToSection('products')}>Каталог</IonButton>
          <IonButton fill="clear" onClick={() => scrollToSection('company')}>О компании</IonButton>
          <IonButton fill="clear" onClick={() => scrollToSection('applications')}>Применение</IonButton>
          <IonButton fill="clear" onClick={() => scrollToSection('certificates')}>Сертификаты</IonButton>
          <IonButton fill="clear" onClick={() => scrollToSection('contact')}>Контакты</IonButton>
        </div>
      </IonToolbar>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <IonButton fill="clear" expand="block" onClick={() => scrollToSection('home')}>Главная</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => scrollToSection('display')}>Продуктовые решения</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => scrollToSection('products')}>Каталог</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => scrollToSection('company')}>О компании</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => scrollToSection('applications')}>Применение</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => scrollToSection('certificates')}>Сертификаты</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => scrollToSection('contact')}>Контакты</IonButton>
        </div>
      )}
    </IonHeader>
  );
};

export default Header;
