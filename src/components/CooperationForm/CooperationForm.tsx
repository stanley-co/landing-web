import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { sendOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { BITRIX_WEBHOOK_URL, isBitrixConfigured, isDemoMode, isFormDisabled } from '../../config/bitrix';
import { parseFormError, formatErrorDetails } from '../../utils/errorHandler';
import styles from './CooperationForm.module.css';

type FormData = {
  company: string;
  name: string;
  secondName: string;
  lastName: string;
  phone: string;
  comment: string;
};

type CooperationFormProps = {
  onSuccess?: () => void;
  showHeader?: boolean;
};

const CooperationForm = ({ onSuccess, showHeader = true }: CooperationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    name: '',
    secondName: '',
    lastName: '',
    phone: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Проверяем, отключена ли форма
  if (isFormDisabled()) {
    console.log('[CooperationForm] Form is disabled. Returning null.');
    return null;
  }

  // Логируем конфигурацию при монтировании компонента
  useEffect(() => {
    console.log('========================================');
    console.log('[CooperationForm] Component mounted');
    console.log('[CooperationForm] Form disabled:', isFormDisabled() ? 'YES' : 'NO');
    console.log('[CooperationForm] Bitrix webhook URL:', BITRIX_WEBHOOK_URL);
    console.log('[CooperationForm] Demo mode:', isDemoMode() ? 'ENABLED' : 'DISABLED');
    console.log('[CooperationForm] Bitrix configured:', isBitrixConfigured());
    console.log('[CooperationForm] Environment variable VITE_BITRIX_WEBHOOK_URL:', import.meta.env.VITE_BITRIX_WEBHOOK_URL || 'not set');
    console.log('[CooperationForm] Environment variable VITE_BITRIX_DEMO_MODE:', import.meta.env.VITE_BITRIX_DEMO_MODE || 'not set');
    console.log('[CooperationForm] Environment variable VITE_FORM_DISABLED:', import.meta.env.VITE_FORM_DISABLED || 'not set');
    console.log('========================================');
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    console.log('[CooperationForm] Form submitted with data:', formData);

    try {
      // Проверяем, настроен ли webhook
      const isConfigured = isBitrixConfigured();
      console.log('[CooperationForm] Checking Bitrix configuration...');
      console.log('[CooperationForm] Webhook URL:', BITRIX_WEBHOOK_URL);
      console.log('[CooperationForm] Is configured:', isConfigured);

      if (!isConfigured) {
        const demoModeEnabled = isDemoMode();
        if (demoModeEnabled) {
          console.warn('[CooperationForm] ⚠️ DEMO MODE is enabled. Form will not send requests to Bitrix24.');
          console.warn('[CooperationForm] To disable: Set VITE_BITRIX_DEMO_MODE=false in .env.local');
        } else {
          console.warn('[CooperationForm] Bitrix webhook not configured. Running in DEMO mode.');
          console.warn('[CooperationForm] To enable real submission, configure webhook URL in .env.local');
        }
        // Демо-режим: показываем успех без реальной отправки
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('[CooperationForm] DEMO mode: Showing success message');
        setIsSuccess(true);
        setFormData({
          company: '',
          name: '',
          secondName: '',
          lastName: '',
          phone: '',
          comment: ''
        });
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1000);
        } else {
          setTimeout(() => setIsSuccess(false), 5000);
        }
        return;
      }

      console.log('[CooperationForm] Bitrix webhook configured. Preparing request...');

      // Формируем полное имя из компонентов
      const fullName = [
        formData.lastName,
        formData.name,
        formData.secondName
      ].filter(Boolean).join(' ').trim() || formData.name;

      // Формируем данные для отправки в Bitrix24
      const leadData = {
        fields: {
          TITLE: formData.company || `Заявка с сайта от ${fullName || 'клиента'}`,
          NAME: formData.name || '',
          SECOND_NAME: formData.secondName || '',
          LAST_NAME: formData.lastName || '',
          COMPANY_TITLE: formData.company || '',
          STATUS_ID: 'NEW',
          OPENED: 'Y',
          CURRENCY_ID: 'RUB',
          PHONE: formData.phone ? [{ VALUE: formData.phone, VALUE_TYPE: 'WORK' }] : [],
          COMMENTS: formData.comment || '',
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: 'Заявка с сайта',
        }
      };

      console.log('[CooperationForm] Lead data prepared:', leadData);
      console.log('[CooperationForm] Sending request to:', BITRIX_WEBHOOK_URL);

      // Отправляем запрос в Bitrix24 через webhook с таймаутом
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 секунд таймаут

      let response: Response;
      try {
        response = await fetch(BITRIX_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        // Обрабатываем ошибки fetch отдельно
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          throw new Error('TIMEOUT: Превышено время ожидания ответа от сервера');
        }
        
        // Передаем дальше для детальной обработки
        throw fetchError;
      }

      console.log('[CooperationForm] Response status:', response.status);
      console.log('[CooperationForm] Response ok:', response.ok);
      console.log('[CooperationForm] Response headers:', Object.fromEntries(response.headers.entries()));

      // Проверяем, что получили JSON
      let result: any;
      const contentType = response.headers.get('content-type');
      
      // Сначала читаем ответ как текст, чтобы можно было использовать его для парсинга или ошибки
      const textResponse = await response.text();
      
      if (contentType && contentType.includes('application/json')) {
        try {
          result = JSON.parse(textResponse);
          console.log('[CooperationForm] Response data:', result);
        } catch (jsonError) {
          console.error('[CooperationForm] Failed to parse JSON response:', jsonError);
          console.error('[CooperationForm] Response text:', textResponse);
          throw new Error(`Ошибка парсинга ответа от сервера. Код ответа: ${response.status}. Ответ: ${textResponse.substring(0, 200)}`);
        }
      } else {
        console.error('[CooperationForm] Non-JSON response received');
        console.error('[CooperationForm] Content-Type:', contentType);
        console.error('[CooperationForm] Response text:', textResponse);
        throw new Error(`Сервер вернул неожиданный формат ответа (не JSON). Код: ${response.status}`);
      }

      // Bitrix24 возвращает ошибку в формате { error: 'CODE', error_description: 'Text' }
      if (!response.ok || result.error) {
        console.error('[CooperationForm] Bitrix24 error response:', result);
        console.error('[CooperationForm] HTTP Status:', response.status, response.statusText);
        
        let errorMessage = 'Ошибка при обработке заявки на сервере';
        
        if (result.error) {
          errorMessage = result.error_description || 
                        result.error_message ||
                        result.error ||
                        `Ошибка Bitrix24: ${result.error}`;
        } else if (response.status === 401) {
          errorMessage = 'Ошибка авторизации. Проверьте настройки webhook в Bitrix24.';
        } else if (response.status === 403) {
          errorMessage = 'Доступ запрещен. Проверьте права webhook в Bitrix24.';
        } else if (response.status === 404) {
          errorMessage = 'Webhook не найден. Проверьте URL вебхука в настройках.';
        } else if (response.status === 500) {
          errorMessage = 'Внутренняя ошибка сервера Bitrix24. Попробуйте позже.';
        } else if (response.status >= 400) {
          errorMessage = `Ошибка сервера (код ${response.status}). ${response.statusText || 'Попробуйте позже.'}`;
        }
        
        throw new Error(errorMessage);
      }

      // Проверяем, что лид успешно создан (результат должен содержать ID)
      if (!result.result) {
        console.warn('[CooperationForm] Bitrix24 response missing result:', result);
        console.warn('[CooperationForm] Full response:', JSON.stringify(result, null, 2));
        throw new Error('Не удалось создать лид в Bitrix24. Ответ сервера не содержит ID созданного лида.');
      }

      console.log('[CooperationForm] Lead created successfully! Lead ID:', result.result);

      // Успешная отправка
      setIsSuccess(true);
      setFormData({
        company: '',
        name: '',
        secondName: '',
        lastName: '',
        phone: '',
        comment: ''
      });
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (err) {
      // Детальная обработка ошибок
      const formError = parseFormError(err);
      
      console.error('========================================');
      console.error('[CooperationForm] Form submission error occurred');
      console.error(formatErrorDetails(formError));
      console.error('[CooperationForm] Error type:', formError.type);
      console.error('[CooperationForm] Original error:', formError.originalError);
      
      // Дополнительная информация в зависимости от типа ошибки
      if (formError.type === 'CORS_ERROR') {
        console.error('[CooperationForm] ⚠️ CORS ERROR DETECTED');
        console.error('[CooperationForm] Это может означать:');
        console.error('[CooperationForm] - Webhook URL неверный или недоступен');
        console.error('[CooperationForm] - Проблемы с настройками CORS на стороне Bitrix24');
        console.error('[CooperationForm] - Запрос блокируется браузером');
        console.error('[CooperationForm] На production это обычно не проблема, проверьте на реальном сервере.');
      } else if (formError.type === 'NETWORK_ERROR') {
        console.error('[CooperationForm] ⚠️ NETWORK ERROR DETECTED');
        console.error('[CooperationForm] Проверьте подключение к интернету');
      } else if (formError.type === 'TIMEOUT_ERROR') {
        console.error('[CooperationForm] ⚠️ TIMEOUT ERROR DETECTED');
        console.error('[CooperationForm] Сервер не ответил в течение 30 секунд');
      } else if (formError.type === 'BITRIX_ERROR') {
        console.error('[CooperationForm] ⚠️ BITRIX24 ERROR DETECTED');
        console.error('[CooperationForm] Ошибка на стороне Bitrix24 API');
      }
      console.error('========================================');
      
      // Показываем понятное сообщение пользователю
      setError(formError.userMessage);
      console.error('[CooperationForm] Error message shown to user:', formError.userMessage);
    } finally {
      setIsSubmitting(false);
      console.log('[CooperationForm] Form submission process finished');
    }
  };

  return (
    <IonCard className={styles.formCard}>
      {showHeader && (
        <IonCardHeader>
          <IonCardTitle className={styles.formTitle}>Оставить заявку</IonCardTitle>
        </IonCardHeader>
      )}
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
  );
};

export default CooperationForm;

