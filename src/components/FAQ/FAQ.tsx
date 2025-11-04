import styles from "./FAQ.module.css";

const faqs = [
  { q: "Какие сроки поставки?", a: "Обычно 7–14 дней по России." },
  { q: "Есть ли обучение?", a: "Да, обучение персонала включено." },
];

const FAQ = () => (
  <section className={styles.faq}>
    <h2>FAQ</h2>
    <div className={styles.list}>
      {faqs.map((f, i) => (
        <div key={i} className={styles.item}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FAQ;


