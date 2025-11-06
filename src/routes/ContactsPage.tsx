import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import CompanyIntro from '../components/CompanyIntro/CompanyIntro';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';

const ContactsPage = () => (
  <IonPage>
    <PageWrapper>
      <IonContent>
        <CompanyIntro />
        <CooperationFormSection />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default ContactsPage;


