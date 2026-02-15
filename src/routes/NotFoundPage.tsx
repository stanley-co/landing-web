import { IonContent, IonPage, IonButton, IonIcon } from '@ionic/react';
import { homeOutline, arrowBackOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import Footer from '../components/Footer/Footer';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <DocumentHead title="Страница не найдена — ФКИТ" noCanonical />
      <PageWrapper>
        <IonContent>
          <section className={styles.notFound}>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.errorCode}>404</div>
                <h1 className={styles.title}>Страница не найдена</h1>
                <p className={styles.description}>
                  К сожалению, запрашиваемая страница не существует или была перемещена.
                </p>
                <div className={styles.actions}>
                  <IonButton
                    color="primary"
                    size="large"
                    onClick={() => navigate('/')}
                    className={styles.button}
                  >
                    <IonIcon icon={homeOutline} slot="start" />
                    На главную
                  </IonButton>
                  <IonButton
                    fill="outline"
                    size="large"
                    onClick={() => navigate(-1)}
                    className={styles.button}
                  >
                    <IonIcon icon={arrowBackOutline} slot="start" />
                    Назад
                  </IonButton>
                </div>
                <div className={styles.links}>
                  <p className={styles.linksTitle}>Популярные разделы:</p>
                  <div className={styles.linksList}>
                    <button onClick={() => navigate('/equipment')} className={styles.link}>
                      Оборудование
                    </button>
                    <button onClick={() => navigate('/news')} className={styles.link}>
                      Новости
                    </button>
                    <button onClick={() => navigate('/contacts')} className={styles.link}>
                      Контакты
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default NotFoundPage;

