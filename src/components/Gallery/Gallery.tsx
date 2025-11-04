import styles from "./Gallery.module.css";

const Gallery = () => (
  <section className={styles.gallery}>
    <h2>Галерея</h2>
    <div className={styles.grid}>
      <div className={styles.item}>Изображение 1</div>
      <div className={styles.item}>Изображение 2</div>
      <div className={styles.item}>Изображение 3</div>
    </div>
  </section>
);

export default Gallery;


