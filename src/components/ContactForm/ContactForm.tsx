import { useState } from "react";
import type React from "react";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [request, setRequest] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Спасибо, ${name}! Мы свяжемся с вами по телефону ${tel}.`);
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2>Свяжитесь с нами</h2>
      <p>Заполните форму, и мы свяжемся с вами в ближайшее время.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Компания" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input type="text" placeholder="Штат/регион" value={state} onChange={(e) => setState(e.target.value)} />
        <input type="text" placeholder="Страна" value={country} onChange={(e) => setCountry(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Телефон" value={tel} onChange={(e) => setTel(e.target.value)} required />
        <textarea placeholder="Запрос по продукту" value={request} onChange={(e) => setRequest(e.target.value)} />
        <button type="submit">Отправить</button>
      </form>
    </section>
  );
};

export default ContactForm;
