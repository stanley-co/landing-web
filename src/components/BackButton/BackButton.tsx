import { IonButton, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import styles from './BackButton.module.css';

type BackButtonProps = {
  className?: string;
  position?: 'top' | 'bottom';
  text?: string;
};

const BackButton = ({ className = '', position = 'top', text = 'Назад' }: BackButtonProps) => {
  const handleBack = () => {
    // Используем history.back() для возврата на предыдущую страницу
    // Это работает корректно даже после переходов между фильтрами и категориями
    window.history.back();
  };

  return (
    <div className={`${styles.container} ${styles[position]} ${className}`}>
      <IonButton
        fill="outline"
        color="medium"
        className={styles.backButton}
        onClick={handleBack}
      >
        <IonIcon icon={arrowBackOutline} slot="start" />
        {text}
      </IonButton>
    </div>
  );
};

export default BackButton;

