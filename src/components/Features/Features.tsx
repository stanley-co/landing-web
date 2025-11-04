import styles from "./Features.module.css";

const items = [
  {
    title: "Smart Automated Vacuum Emulsifying Mixer",
    desc: "Высокая безопасность · Интеллектуальный PLC · Точный контроль температуры",
  },
  {
    title: "High Efficient Cosmetic Vacuum Emulsifier",
    desc: "GMP-дизайн · Широкая совместимость · Экономия труда · Автоматический трубопровод",
  },
  {
    title: "Automatic Gel Making Machine",
    desc: "Стабильная эмульсия и постоянное качество продукции",
  },
];

const Features = () => (
  <section id="display" className={styles.features}>
    {items.map((f, i) => (
      <div key={i} className={styles.card}>
        <h3>{f.title}</h3>
        <p>{f.desc}</p>
      </div>
    ))}
  </section>
);

export default Features;
