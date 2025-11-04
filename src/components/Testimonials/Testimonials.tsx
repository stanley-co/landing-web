import styles from "./Testimonials.module.css";

const testimonials = [
  { name: "ООО Прогресс", text: "Отличные станки, повысили производительность." },
  { name: "Завод №7", text: "Сервис и обучение на высоте." },
];

const Testimonials = () => (
  <section className={styles.testimonials}>
    <h2>Отзывы клиентов</h2>
    <div className={styles.list}>
      {testimonials.map((t) => (
        <div key={t.name} className={styles.card}>
          <p>“{t.text}”</p>
          <span>— {t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;


