import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonImg, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContactFormModal } from '../../contexts/ContactFormModalContext';
import styles from "./EquipmentCard.module.css";

type EquipmentCardProps = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  priceAmount?: number | null;
  priceCurrency?: 'RUB' | 'USD' | 'CNY';
  priceDisplayMode?: 'EXACT' | 'FROM';
  promotionText?: string | null;
};

function formatPrice(amount: number, currency: NonNullable<EquipmentCardProps['priceCurrency']>, mode?: EquipmentCardProps['priceDisplayMode']) {
  const value = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(amount);
  const formatted = currency === 'RUB' ? `${value} ₽` : currency === 'USD' ? `$${value}` : `¥${value}`;
  return mode === 'FROM' ? `от ${formatted}` : formatted;
}

const EquipmentCard = ({ id, name, image, description, priceAmount, priceCurrency, priceDisplayMode, promotionText }: EquipmentCardProps) => {
  const navigate = useNavigate();
  const { openModal } = useContactFormModal();
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
        {priceAmount != null && priceCurrency ? <>
          <p className={styles.price}>{formatPrice(priceAmount, priceCurrency, priceDisplayMode)}</p>
          {promotionText && <p className={styles.promotion}>{promotionText}</p>}
        </> : null}
        <IonButton
          expand="block" 
          fill="outline" 
          className={styles.button}
          aria-label={priceAmount != null && priceCurrency ? `Подробнее о ${name}` : `Запросить цену: ${name}`}
          onClick={() => priceAmount != null && priceCurrency ? navigate(`/equipment/${id}`) : openModal(name, id)}
        >
          {priceAmount != null && priceCurrency ? <>Подробнее<IonIcon icon={arrowForwardOutline} slot="end" /></> : 'Запросить цену'}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default EquipmentCard;
