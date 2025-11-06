import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { sendOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import styles from "./CooperationFormSection.module.css";

type FormData = {
  company: string;
  name: string;
  secondName: string;
  lastName: string;
  phone: string;
  website: string;
  comment: string;
};

const CooperationFormSection = () => {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    name: '',
    secondName: '',
    lastName: '',
    phone: '',
    website: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: Замените на ваш Bitrix24 адрес и токен
      const BITRIX24_URL = import.meta.env.VITE_BITRIX24_URL || '';
      const BITRIX24_TOKEN = import.meta.env.VITE_BITRIX24_TOKEN || '';

      if (!BITRIX24_URL || !BITRIX24_TOKEN) {
        // Для демо-режима просто показываем успех
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSuccess(true);
        setFormData({
          company: '',
          name: '',
          secondName: '',
          lastName: '',
          phone: '',
          website: '',
          comment: ''
        });
        setTimeout(() => setIsSuccess(false), 5000);
        return;
      }

      const response = await fetch(`${BITRIX24_URL}/rest/crm.lead.add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            TITLE: formData.company || 'Заявка с сайта',
            NAME: formData.name,
            SECOND_NAME: formData.secondName,
            LAST_NAME: formData.lastName,
            STATUS_ID: 'NEW',
            OPENED: 'Y',
            ASSIGNED_BY_ID: 1,
            CURRENCY_ID: 'RUB',
            OPPORTUNITY: 0,
            PHONE: formData.phone ? [{ VALUE: formData.phone, VALUE_TYPE: 'WORK' }] : [],
            WEB: formData.website ? [{ VALUE: formData.website, VALUE_TYPE: 'WORK' }] : [],
            COMMENTS: formData.comment,
          },
          params: { REGISTER_SONET_EVENT: 'Y' },
          auth: BITRIX24_TOKEN,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке заявки');
      }

      setIsSuccess(true);
      setFormData({
        company: '',
        name: '',
        secondName: '',
        lastName: '',
        phone: '',
        website: '',
        comment: ''
      });
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Готовы начать сотрудничество?</h2>
          <p className={styles.subtitle}>
            Заполните форму, и наш специалист свяжется с вами, чтобы обсудить проект или подобрать оборудование.
          </p>
        </div>

        <IonCard className={styles.formCard}>
          <IonCardHeader>
            <IonCardTitle className={styles.formTitle}>Оставить заявку</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {isSuccess ? (
              <div className={styles.successMessage}>
                <IonIcon icon={checkmarkCircleOutline} className={styles.successIcon} />
                <h3>Спасибо! Ваша заявка отправлена.</h3>
                <p>Наш специалист свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <IonItem className={styles.formItem}>
                  <IonLabel position="stacked">Название компании *</IonLabel>
                  <IonInput
                    type="text"
                    value={formData.company}
                    onIonInput={(e) => handleInputChange('company', e.detail.value!)}
                    required
                    placeholder="ИП Титов"
                  />
                </IonItem>

                <div className={styles.nameRow}>
                  <IonItem className={styles.formItem}>
                    <IonLabel position="stacked">Имя *</IonLabel>
                    <IonInput
                      type="text"
                      value={formData.name}
                      onIonInput={(e) => handleInputChange('name', e.detail.value!)}
                      required
                      placeholder="Глеб"
                    />
                  </IonItem>

                  <IonItem className={styles.formItem}>
                    <IonLabel position="stacked">Отчество</IonLabel>
                    <IonInput
                      type="text"
                      value={formData.secondName}
                      onIonInput={(e) => handleInputChange('secondName', e.detail.value!)}
                      placeholder="Егорович"
                    />
                  </IonItem>

                  <IonItem className={styles.formItem}>
                    <IonLabel position="stacked">Фамилия *</IonLabel>
                    <IonInput
                      type="text"
                      value={formData.lastName}
                      onIonInput={(e) => handleInputChange('lastName', e.detail.value!)}
                      required
                      placeholder="Титов"
                    />
                  </IonItem>
                </div>

                <IonItem className={styles.formItem}>
                  <IonLabel position="stacked">Телефон *</IonLabel>
                  <IonInput
                    type="tel"
                    value={formData.phone}
                    onIonInput={(e) => handleInputChange('phone', e.detail.value!)}
                    required
                    placeholder="+7 (999) 555-88-88"
                  />
                </IonItem>

                <IonItem className={styles.formItem}>
                  <IonLabel position="stacked">Веб-сайт</IonLabel>
                  <IonInput
                    type="url"
                    value={formData.website}
                    onIonInput={(e) => handleInputChange('website', e.detail.value!)}
                    placeholder="www.mysite.com"
                  />
                </IonItem>

                <IonItem className={styles.formItem}>
                  <IonLabel position="stacked">Комментарий / Сообщение</IonLabel>
                  <IonTextarea
                    value={formData.comment}
                    onIonInput={(e) => handleInputChange('comment', e.detail.value!)}
                    placeholder="Хочу запросить КП на эмульгатор VM-01"
                    rows={4}
                  />
                </IonItem>

                {error && (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                )}

                <IonButton
                  type="submit"
                  expand="block"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? (
                    <>
                      <IonSpinner name="crescent" />
                      <span style={{ marginLeft: '8px' }}>Отправка...</span>
                    </>
                  ) : (
                    <>
                      <IonIcon icon={sendOutline} slot="start" />
                      Отправить заявку
                    </>
                  )}
                </IonButton>
              </form>
            )}
          </IonCardContent>
        </IonCard>
      </div>
    </section>
  );
};

export default CooperationFormSection;

