import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import ContactInfo from '../components/ContactInfo/ContactInfo';
import ContactForm from '../components/ContactForm/ContactForm';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';

const ContactsPage = () => (
  <IonPage>
    <PageWrapper>
      <IonContent>
        <ContactInfo />
        <ContactForm />
        <CooperationFormSection />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default ContactsPage;