import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { checkmarkCircleOutline, shieldCheckmarkOutline, constructOutline, timeOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./ProductDescription.module.css";

type ProductDescriptionProps = {
  name: string;
  description: string;
  fullDescription: string;
};

const ProductDescription = ({ description, fullDescription }: ProductDescriptionProps) => {
  const advantages = [
    {
      icon: shieldCheckmarkOutline,
      title: "Высокое качество материалов",
      description: "Использование сертифицированных материалов и компонентов"
    },
    {
      icon: constructOutline,
      title: "Точное соответствие спецификациям",
      description: "Строгий контроль качества на всех этапах производства"
    },
    {
      icon: timeOutline,
      title: "Гарантия и сервисное обслуживание",
      description: "Долгосрочная гарантия и профессиональная техническая поддержка"
    },
    {
      icon: checkmarkCircleOutline,
      title: "Индивидуальные решения",
      description: "Адаптация оборудования под специфические требования заказчика"
    }
  ];

  return (
    <section className={styles.description}>
      <div className={styles.container}>
        <IonGrid>
          <IonRow>
            {/* Описание - занимает всю ширину */}
            <IonCol size="12">
              <IonCard className={styles.descriptionCard}>
                <IonCardHeader>
                  <IonCardTitle className={styles.title}>Описание продукта</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className={styles.text}>{fullDescription || description}</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          
          {/* Преимущества - сетка 2x2 на desktop, 1 колонка на mobile */}
          <IonRow>
            <IonCol size="12">
              <h2 className={styles.advantagesTitle}>Ключевые преимущества</h2>
            </IonCol>
          </IonRow>
          
          <IonRow>
            {advantages.map((advantage, index) => (
              <IonCol size="12" sizeMd="6" key={index}>
                <IonCard className={styles.advantageCard}>
                  <IonCardContent>
                    <div className={styles.advantageItem}>
                      <div className={styles.advantageIcon}>
                        <IonIcon icon={advantage.icon} />
                      </div>
                      <div className={styles.advantageContent}>
                        <h3 className={styles.advantageTitle}>{advantage.title}</h3>
                        <p className={styles.advantageDescription}>{advantage.description}</p>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};

export default ProductDescription;

