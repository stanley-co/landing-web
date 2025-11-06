import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';

const NewsPage = () => (
  <IonPage>
    <PageWrapper>
      <IonContent>
        <h2 style={{ padding: 16 }}>Новости</h2>
        {/* TODO: внедрить список новостей и карточки */}
        <CooperationFormSection />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default NewsPage;


