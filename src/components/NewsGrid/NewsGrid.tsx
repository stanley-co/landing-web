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
      <section className={styles.list}>
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
    <section className={styles.list}>
      <div className={styles.container}>
        <div className={styles.newsList}>
          {news.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.date}
              category={item.category}
              image={item.image}
              preview={item.preview}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;

