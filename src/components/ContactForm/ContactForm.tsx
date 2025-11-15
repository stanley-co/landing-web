import { useState } from "react";
import type React from "react";
import { IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [request, setRequest] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Спасибо, ${name}! Мы свяжемся с вами по телефону ${tel}.`);
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Свяжитесь с нами</h2>
        <p className={styles.subtitle}>Заполните вашу информацию, и мы свяжемся с вами немедленно. Давайте лучше поймем ваши потребности.</p>
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
                      <IonLabel position="stacked">Компания</IonLabel>
                      <IonInput 
                        value={company} 
                        onIonInput={(e) => setCompany(e.detail.value!)} 
                        placeholder="Название компании"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Штат/регион</IonLabel>
                      <IonInput 
                        value={state} 
                        onIonInput={(e) => setState(e.detail.value!)} 
                        placeholder="Регион"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Страна</IonLabel>
                      <IonInput 
                        value={country} 
                        onIonInput={(e) => setCountry(e.detail.value!)} 
                        placeholder="Страна"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Email</IonLabel>
                      <IonInput 
                        type="email"
                        value={email} 
                        onIonInput={(e) => setEmail(e.detail.value!)} 
                        placeholder="email@example.com"
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
                      <IonLabel position="stacked">Запрос по продукту</IonLabel>
                      <IonTextarea 
                        value={request} 
                        onIonInput={(e) => setRequest(e.detail.value!)} 
                        placeholder="Опишите ваш запрос..."
                        rows={4}
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
                      Отправить заявку
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
