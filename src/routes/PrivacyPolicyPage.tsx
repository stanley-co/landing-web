import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useEffect, useState } from 'react';
import { landingApi, type PrivacyPolicyDto } from '../api/public';
import PageWrapper from '../components/layout/PageWrapper';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import Footer from '../components/Footer/Footer';
import styles from './PrivacyPolicyPage.module.css';

const PrivacyPolicyPage = () => {
  const [policy, setPolicy] = useState<PrivacyPolicyDto>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    landingApi.privacyPolicy().then(setPolicy).catch((reason) => setError(reason instanceof Error ? reason.message : 'Не удалось загрузить политику'));
  }, []);

  return <IonPage>
    <DocumentHead title={policy?.seoTitle || 'Политика конфиденциальности — ФКИТ'} description={policy?.seoDescription || 'Политика обработки персональных данных.'} ogImage={policy?.ogImage} canonicalPath="/privacy-policy" />
    <PageWrapper><IonContent>
      <section className={styles.section}><div className={styles.container}>
        {!policy && !error && <div className={styles.loading}><IonSpinner name="crescent" /><p>Загрузка политики…</p></div>}
        {error && <div className={styles.block}><h1>Политика временно недоступна</h1><p>{error}</p></div>}
        {policy && <>
          <header className={styles.header}><h1 className={styles.title}>{policy.title}</h1><p className={styles.effectiveDate}>Дата вступления в силу: {new Date(policy.effectiveDate).toLocaleDateString('ru-RU')}</p>{policy.lastModifiedDate && <p className={styles.effectiveDate}>Последнее изменение: {new Date(policy.lastModifiedDate).toLocaleDateString('ru-RU')}</p>}</header>
          <article className={`${styles.block} ${styles.markdown}`}>{policy.markdown}</article>
        </>}
      </div></section><Footer />
    </IonContent></PageWrapper>
  </IonPage>;
};

export default PrivacyPolicyPage;
