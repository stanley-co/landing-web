import { IonCard, IonCardContent, IonButton } from '@ionic/react';
import { chevronDownOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Hero.module.css";

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <IonCard className={styles.heroCard}>
          <IonCardContent className={styles.content}>
            <h1 className={styles.title}>Интеллектуальные смесительные решения</h1>
            <p className={styles.subtitle}>
              Вакуумные эмульгаторы, миксеры, дозаторы и резервуары для косметики и химии
            </p>
            <IonButton 
              size="large" 
              expand="block" 
              className={styles.cta}
              onClick={scrollToProducts}
            >
              Каталог продукции
              <IonIcon icon={chevronDownOutline} slot="end" />
            </IonButton>
          </IonCardContent>
        </IonCard>
      </div>
    </section>
  );
};

export default Hero;
