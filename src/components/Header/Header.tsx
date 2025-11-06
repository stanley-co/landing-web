import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { menuOutline, closeOutline } from 'ionicons/icons';
import { useState } from 'react';
import styles from "./Header.module.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <IonButton fill="clear" onClick={() => navigate('/')}>Главная</IonButton>
          <IonButton fill="clear" onClick={() => navigate('/equipment')}>Оборудование</IonButton>
          <IonButton fill="clear" onClick={() => navigate('/news')}>Новости</IonButton>
          <IonButton fill="clear" onClick={() => navigate('/contacts')}>Контакты</IonButton>
        </div>
      </IonToolbar>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <IonButton fill="clear" expand="block" onClick={() => { navigate('/'); setMenuOpen(false); }}>Главная</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => { navigate('/equipment'); setMenuOpen(false); }}>Оборудование</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => { navigate('/news'); setMenuOpen(false); }}>Новости</IonButton>
          <IonButton fill="clear" expand="block" onClick={() => { navigate('/contacts'); setMenuOpen(false); }}>Контакты</IonButton>
        </div>
      )}
    </IonHeader>
  );
};

export default Header;
