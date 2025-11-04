import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1>СТАНОК ПРО</h1>
        <nav>
        <a href="#home">Главная</a>
        <a href="#display">Продуктовые решения</a>
        <a href="#products">Каталог</a>
        <a href="#company">О компании</a>
        <a href="#applications">Применение</a>
        <a href="#certificates">Сертификаты</a>
        <a href="#contact">Контакты</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
