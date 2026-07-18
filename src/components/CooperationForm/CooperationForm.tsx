import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonInput, IonItem, IonLabel, IonSpinner, IonTextarea } from '@ionic/react';
import { checkmarkCircleOutline, sendOutline } from 'ionicons/icons';
import { useState } from 'react';
import { landingApi } from '../../api/public';
import styles from './CooperationForm.module.css';

type FormData = { company: string; firstName: string; phone: string; email: string; comment: string };
type CooperationFormProps = { onSuccess?: () => void; showHeader?: boolean; initialProductId?: string | null; initialProductName?: string | null };
const emptyForm: FormData = { company: '', firstName: '', phone: '', email: '', comment: '' };

const CooperationForm = ({ onSuccess, showHeader = true, initialProductId = null, initialProductName = null }: CooperationFormProps) => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>();
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const handleInputChange = (field: keyof FormData, value: string) => { setFormData((current) => ({ ...current, [field]: value })); setError(undefined); };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(undefined);
    if (!isConsentGiven) { setError('Необходимо согласие на обработку персональных данных.'); return; }
    setIsSubmitting(true);
    try {
      await landingApi.createLead({
        formType: initialProductId ? 'PRODUCT_REQUEST' : 'FEEDBACK',
        source: initialProductId ? 'PRODUCT_MODAL' : 'LANDING_FEEDBACK',
        companyName: formData.company.trim(),
        firstName: formData.firstName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        comment: [initialProductName ? `Товар: ${initialProductName}` : '', formData.comment.trim()].filter(Boolean).join('\n\n') || undefined,
        productId: initialProductId || undefined,
        consentAccepted: true
      });
      setFormData(emptyForm);
      setIsConsentGiven(false);
      setIsSuccess(true);
      if (onSuccess) window.setTimeout(onSuccess, 1000); else window.setTimeout(() => setIsSuccess(false), 5000);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Не удалось отправить заявку. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <IonCard className={styles.formCard}>
    {showHeader && <IonCardHeader><IonCardTitle className={styles.formTitle}>Оставить заявку</IonCardTitle></IonCardHeader>}
    <IonCardContent>{isSuccess ? <div className={styles.successMessage}><IonIcon icon={checkmarkCircleOutline} className={styles.successIcon} /><h3>Спасибо! Ваша заявка отправлена.</h3><p>Наш специалист свяжется с вами в ближайшее время.</p></div> : <form onSubmit={handleSubmit} className={styles.form}>
      {initialProductName && <p className={styles.contactHint}>Запрос по товару: <strong>{initialProductName}</strong></p>}
      <IonItem className={styles.formItem}><IonLabel position="stacked">Название компании *</IonLabel><IonInput type="text" value={formData.company} onIonInput={(event) => handleInputChange('company', event.detail.value ?? '')} required /></IonItem>
      <IonItem className={styles.formItem}><IonLabel position="stacked">Имя *</IonLabel><IonInput type="text" value={formData.firstName} onIonInput={(event) => handleInputChange('firstName', event.detail.value ?? '')} required /></IonItem>
      <IonItem className={styles.formItem}><IonLabel position="stacked">Телефон *</IonLabel><IonInput type="tel" value={formData.phone} onIonInput={(event) => handleInputChange('phone', event.detail.value ?? '')} required placeholder="+7 (999) 555-88-88" /></IonItem>
      <IonItem className={styles.formItem}><IonLabel position="stacked">Email *</IonLabel><IonInput type="email" value={formData.email} onIonInput={(event) => handleInputChange('email', event.detail.value ?? '')} required placeholder="name@example.com" /></IonItem>
      <IonItem className={styles.formItem}><IonLabel position="stacked">Комментарий / Сообщение</IonLabel><IonTextarea value={formData.comment} onIonInput={(event) => handleInputChange('comment', event.detail.value ?? '')} rows={4} /></IonItem>
      <div className={styles.consent}><label className={styles.consentLabel}><input type="checkbox" checked={isConsentGiven} onChange={(event) => setIsConsentGiven(event.target.checked)} className={styles.consentCheckbox} /><span>Я соглашаюсь с <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">обработкой моих персональных данных</a></span></label></div>
      {error && <div className={styles.errorMessage} role="alert">{error}</div>}
      <IonButton type="submit" expand="block" color="primary" size="large" disabled={isSubmitting || !isConsentGiven} className={styles.submitButton}>{isSubmitting ? <><IonSpinner name="crescent" /><span style={{ marginLeft: 8 }}>Отправка…</span></> : <><IonIcon icon={sendOutline} slot="start" />Отправить заявку</>}</IonButton>
    </form>}</IonCardContent>
  </IonCard>;
};

export default CooperationForm;
