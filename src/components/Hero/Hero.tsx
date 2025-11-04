import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <h2>Интеллектуальные смесительные решения</h2>
        <p>Вакуумные эмульгаторы, миксеры, дозаторы и резервуары для косметики и химии</p>
        <a href="#products" className={styles.cta}>Каталог</a>
      </div>
    </section>
  );
};

export default Hero;
