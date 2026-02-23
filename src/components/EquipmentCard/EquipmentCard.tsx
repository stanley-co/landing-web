import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonImg, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from "./EquipmentCard.module.css";

type EquipmentCardProps = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
};

const EquipmentCard = ({ id, name, image, description }: EquipmentCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <IonCard className={styles.card}>
      <div
        className={styles.imageContainer}
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/equipment/${id}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(`/equipment/${id}`);
          }
        }}
        aria-label={`Перейти к карточке оборудования: ${name}`}
      >
        {!imageLoaded && <div className={styles.imagePlaceholder} />}
        <IonImg 
          src={image} 
          alt={name} 
          className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
          onIonImgDidLoad={() => setImageLoaded(true)}
        />
      </div>
      <IonCardHeader>
        <IonCardTitle className={styles.title}>{name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p className={styles.description}>{description}</p>
        <IonButton 
          expand="block" 
          fill="outline" 
          className={styles.button}
          onClick={() => navigate(`/equipment/${id}`)}
        >
          Подробнее
          <IonIcon icon={arrowForwardOutline} slot="end" />
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default EquipmentCard;

