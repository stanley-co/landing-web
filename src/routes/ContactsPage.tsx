import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import CompanyIntro from '../components/CompanyIntro/CompanyIntro';
import ContactForm from '../components/ContactForm/ContactForm';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';

const ContactsPage = () => (
  <IonPage>
    <PageWrapper>
      <IonContent>
        <CompanyIntro />
        <ContactForm />
        <CooperationFormSection />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default ContactsPage;


