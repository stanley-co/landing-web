import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';

const NewsArticlePage = () => {
  const { slug } = useParams();
  return (
    <IonPage>
      <PageWrapper>
        <IonContent>
          <h2 style={{ padding: 16 }}>Статья: {slug}</h2>
          {/* TODO: контент статьи */}
          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default NewsArticlePage;


