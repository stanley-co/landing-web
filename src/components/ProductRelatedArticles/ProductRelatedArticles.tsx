import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonButton, IonImg, IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import styles from "./ProductRelatedArticles.module.css";

type Article = {
  id: string;
  title: string;
  date: string;
  category?: string;
  image: string;
  preview: string;
};

type ProductRelatedArticlesProps = {
  articles: Article[];
};

const ProductRelatedArticles = ({ articles }: ProductRelatedArticlesProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className={styles.articles}>
      <div className={styles.container}>
        <h2 className={styles.title}>Полезные статьи</h2>
        <IonGrid>
          <IonRow>
            {articles.map((article) => (
              <IonCol size="12" sizeMd="4" key={article.id}>
                <IonCard className={styles.card}>
                  <div className={styles.imageContainer}>
                    <IonImg src={article.image} alt={article.title} className={styles.image} />
                  </div>
                  <IonCardHeader>
                    <IonCardTitle className={styles.cardTitle}>{article.title}</IonCardTitle>
                    <span className={styles.date}>{formatDate(article.date)}</span>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className={styles.preview}>{article.preview}</p>
                    <IonButton
                      fill="clear"
                      onClick={() => navigate(`/news/${article.id}`)}
                      className={styles.readButton}
                    >
                      Читать далее
                      <IonIcon icon={arrowForwardOutline} slot="end" />
                    </IonButton>
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

export default ProductRelatedArticles;

