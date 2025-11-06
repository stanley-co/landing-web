import { IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import { mailOutline, sendOutline } from 'ionicons/icons';
import { useState } from 'react';
import styles from "./NewsSubscribeCTA.module.css";

const NewsSubscribeCTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Интеграция с email-сервисом (Mailchimp, SendGrid, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');

    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <IonCard className={styles.card}>
          <IonCardContent>
            <div className={styles.content}>
              <IonIcon icon={mailOutline} className={styles.icon} />
              <h2 className={styles.title}>Хотите быть в курсе новых проектов и технологий Stanley?</h2>
              <p className={styles.subtitle}>Подпишитесь на наши обновления!</p>
              
              {isSuccess ? (
                <div className={styles.successMessage}>
                  <p>Спасибо за подписку! Мы отправили вам письмо с подтверждением.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <IonItem className={styles.inputItem}>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput
                      type="email"
                      value={email}
                      onIonInput={(e) => setEmail(e.detail.value!)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </IonItem>
                  <IonButton
                    type="submit"
                    color="primary"
                    size="large"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                  >
                    <IonIcon icon={sendOutline} slot="start" />
                    {isSubmitting ? 'Отправка...' : 'Подписаться'}
                  </IonButton>
                </form>
              )}
            </div>
          </IonCardContent>
        </IonCard>
      </div>
    </section>
  );
};

export default NewsSubscribeCTA;

