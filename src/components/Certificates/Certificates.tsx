import styles from "./Certificates.module.css";

const Certificates = () => (
  <section id="certificates" className={styles.certificates}>
    <h2>Сертификаты</h2>
    <div className={styles.grid}>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className={styles.item}>Сертификат {idx + 1}</div>
      ))}
    </div>
  </section>
);

export default Certificates;


