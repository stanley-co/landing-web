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

function formatAccessiblePrice(amount: number, currency: NonNullable<EquipmentCardProps['priceCurrency']>, mode: NonNullable<EquipmentCardProps['priceDisplayMode']>) {
  const value = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(amount);
  const currencyName = currency === 'RUB' ? 'рублей' : currency === 'USD' ? 'долларов США' : 'китайских юаней';
  return `${mode === 'FROM' ? 'от ' : ''}${value} ${currencyName}`;
}

type DisplayablePrice = {
  amount: number;
  currency: NonNullable<EquipmentCardProps['priceCurrency']>;
  mode: NonNullable<EquipmentCardProps['priceDisplayMode']>;
};

function getDisplayablePrice(
  amount: EquipmentCardProps['priceAmount'],
  currency: EquipmentCardProps['priceCurrency'],
  mode: EquipmentCardProps['priceDisplayMode'],
): DisplayablePrice | null {
  if (
    typeof amount === 'number'
    && Number.isFinite(amount)
    && amount >= 0
    && !Object.is(amount, -0)
    && (currency === 'RUB' || currency === 'USD' || currency === 'CNY')
    && (mode === 'EXACT' || mode === 'FROM')
  ) {
    return { amount, currency, mode };
  }

  return null;
}

const EquipmentCard = ({ id, name, image, description, priceAmount, priceCurrency, priceDisplayMode, promotionText }: EquipmentCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const displayablePrice = getDisplayablePrice(priceAmount, priceCurrency, priceDisplayMode);

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
        {displayablePrice && (
          <dl className={styles.pricePanel}>
            <dt className={styles.priceLabel}>Цена</dt>
            <dd
              className={styles.price}
              aria-label={formatAccessiblePrice(displayablePrice.amount, displayablePrice.currency, displayablePrice.mode)}
            >
              {formatPrice(displayablePrice.amount, displayablePrice.currency, displayablePrice.mode)}
            </dd>
            {promotionText && <dd className={styles.promotion}>{promotionText}</dd>}
          </dl>
        )}
        <IonButton
          expand="block" 
          fill="outline" 
          className={styles.button}
          aria-label={`Подробнее о ${name}`}
          onClick={() => navigate(`/equipment/${id}`)}
        >
          Подробнее<IonIcon icon={arrowForwardOutline} slot="end" />
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default EquipmentCard;
