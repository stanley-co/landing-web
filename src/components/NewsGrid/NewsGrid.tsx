import { IonGrid, IonRow, IonCol } from '@ionic/react';
import NewsCard from '../NewsCard/NewsCard';
import styles from "./NewsGrid.module.css";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  category?: string;
  image: string;
  preview: string;
};

type NewsGridProps = {
  news: NewsItem[];
};

const NewsGrid = ({ news }: NewsGridProps) => {
  if (news.length === 0) {
    return (
      <section className={styles.grid}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📰</div>
            <h3 className={styles.emptyTitle}>Новости не найдены</h3>
            <p className={styles.emptyText}>
              По вашему запросу ничего не найдено. Попробуйте выбрать другую категорию.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.grid}>
      <div className={styles.container}>
        <IonGrid>
          <IonRow>
            {news.map((item) => (
              <IonCol 
                size="12" 
                sizeMd="6" 
                sizeLg="4"
                key={item.id}
                className={styles.col}
              >
                <NewsCard
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  category={item.category}
                  image={item.image}
                  preview={item.preview}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};

export default NewsGrid;

