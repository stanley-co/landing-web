import styles from "./Applications.module.css";

const items = [
  {
    title: "Вакуумные гомогенизаторы",
    text:
      "Вакуумная технология повышает стабильность и однородность эмульсий, сокращает трудозатраты.",
  },
  {
    title: "Оборудование для жидкостей",
    text:
      "Гомогенизирующие смесители для шампуней и жидких средств обеспечивают воспроизводимость.",
  },
  {
    title: "Санитарные резервуары",
    text:
      "Сосуды из нержавеющей стали для фарм-, косметической и пищевой отраслей.",
  },
];

const Applications = () => (
  <section id="applications" className={styles.applications}>
    <h2>Области применения</h2>
    <div className={styles.list}>
      {items.map((i) => (
        <div key={i.title} className={styles.card}>
          <h3>{i.title}</h3>
          <p>{i.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Applications;


