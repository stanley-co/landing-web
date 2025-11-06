import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import testImage from '../../assets/images/test-image.png';
import styles from "./NewsPreview.module.css";

const news = [
  {
    id: 1,
    title: "Новые технологии в вакуумной эмульгации",
    excerpt: "Обзор современных решений для производства косметических продуктов",
    image: testImage,
    slug: "new-vacuum-emulsification-technologies"
  },
  {
    id: 2,
    title: "Преимущества планетарных миксеров",
    excerpt: "Как выбрать оптимальное оборудование для вашего производства",
    image: testImage,
    slug: "planetary-mixer-advantages"
  },
  {
    id: 3,
    title: "Сертификация оборудования по стандартам GMP",
    excerpt: "Важность соответствия международным стандартам качества",
    image: testImage,
    slug: "gmp-certification"
  },
];

const NewsPreview = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.newsPreview}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Новости и статьи</h2>
        <IonGrid>
          <IonRow>
            {news.map((item) => (
              <IonCol size="12" sizeMd="4" key={item.id}>
                <IonCard className={styles.newsCard}>
                  <div className={styles.imageContainer}>
                    <IonImg src={item.image} alt={item.title} className={styles.newsImage} />
                  </div>
                  <IonCardHeader>
                    <IonCardTitle className={styles.newsTitle}>{item.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className={styles.excerpt}>{item.excerpt}</p>
                    <IonButton 
                      fill="clear" 
                      onClick={() => navigate(`/news/${item.slug}`)}
                      className={styles.readButton}
                    >
                      Читать
                      <IonIcon icon={arrowForwardOutline} slot="end" />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <div className={styles.ctaContainer}>
          <IonButton 
            fill="outline"
            onClick={() => navigate('/news')}
            className={styles.ctaButton}
          >
            Все новости
            <IonIcon icon={arrowForwardOutline} slot="end" />
          </IonButton>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;

