import styles from "./CompanyIntro.module.css";

const CompanyIntro = () => (
  <section id="company" className={styles.company}>
    <h2>Hone Machinery</h2>
    <p>
      Специализируемся на разработке, производстве, продаже и сервисе машин для жидкостей,
      лосьонов, кремов, зубных паст и клеев: вакуумные эмульгаторы, смесители, фасовочные
      линии. Предприятие с полным циклом: R&D, производство, монтаж и сервис. Сертификации:
      ISO9001:2000, CE и GMP.
    </p>
    <ul className={styles.badges}>
      <li>Сертифицированное производство</li>
      <li>Тестирование продукции</li>
      <li>Гарантия качества</li>
    </ul>
  </section>
);

export default CompanyIntro;


