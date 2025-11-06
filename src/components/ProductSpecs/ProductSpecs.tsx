import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import styles from "./ProductSpecs.module.css";

type Specs = {
  [key: string]: string | undefined;
};

type ProductSpecsProps = {
  specs: Specs;
};

// Маппинг ключей на читаемые названия
const specLabels: Record<string, string> = {
  volume: 'Объём',
  power: 'Мощность',
  speed: 'Скорость вращения',
  material: 'Материал',
  temperature: 'Температурный диапазон',
  vacuum: 'Вакуум',
  mixing: 'Тип смешивания',
  accuracy: 'Точность',
  capacity: 'Производительность',
  pumps: 'Количество насосов',
  control: 'Система управления',
  pressure: 'Рабочее давление'
};

const ProductSpecs = ({ specs }: ProductSpecsProps) => {
  const specEntries = Object.entries(specs)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => [specLabels[key] || key, value]);

  return (
    <section className={styles.specs}>
      <div className={styles.container}>
        <IonCard className={styles.card}>
          <IonCardHeader>
            <IonCardTitle className={styles.title}>Технические характеристики</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className={styles.table}>
              {specEntries.map(([key, value], index) => (
                <div 
                  key={key} 
                  className={`${styles.row} ${index % 2 === 0 ? styles.even : styles.odd}`}
                >
                  <div className={styles.label}>
                    <span className={styles.labelText}>{key}</span>
                  </div>
                  <div className={styles.value}>
                    <span className={styles.valueText}>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </IonCardContent>
        </IonCard>
      </div>
    </section>
  );
};

export default ProductSpecs;

