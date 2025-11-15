import { useState } from "react";
import type React from "react";
import { IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`);
    // Сброс формы
    setName("");
    setEmail("");
    setTel("");
    setMessage("");
  };

  return (
    <section id="contact-form" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Форма обратной связи</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>Заполните форму, и мы свяжемся с вами в ближайшее время</p>
        </div>
        <IonCard className={styles.formCard}>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Имя *</IonLabel>
                      <IonInput 
                        value={name} 
                        onIonInput={(e) => setName(e.detail.value!)} 
                        placeholder="Ваше имя"
                        required
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Телефон *</IonLabel>
                      <IonInput 
                        type="tel"
                        value={tel} 
                        onIonInput={(e) => setTel(e.detail.value!)} 
                        placeholder="+7 (___) ___-__-__"
                        required
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12">
                    <IonItem>
                      <IonLabel position="stacked">Email *</IonLabel>
                      <IonInput 
                        type="email"
                        value={email} 
                        onIonInput={(e) => setEmail(e.detail.value!)} 
                        placeholder="email@example.com"
                        required
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12">
                    <IonItem>
                      <IonLabel position="stacked">Сообщение *</IonLabel>
                      <IonTextarea 
                        value={message} 
                        onIonInput={(e) => setMessage(e.detail.value!)} 
                        placeholder="Опишите ваш запрос или вопрос..."
                        rows={6}
                        required
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12">
                    <IonButton 
                      type="submit" 
                      expand="block" 
                      size="large"
                      className={styles.submitButton}
                    >
                      Отправить
                      <IonIcon icon={sendOutline} slot="end" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
    </section>
  );
};

export default ContactForm;
