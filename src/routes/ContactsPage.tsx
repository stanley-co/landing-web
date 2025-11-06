import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import CompanyIntro from '../components/CompanyIntro/CompanyIntro';
import ContactForm from '../components/ContactForm/ContactForm';
import Footer from '../components/Footer/Footer';

const ContactsPage = () => (
  <IonPage>
    <PageWrapper>
      <IonContent>
        <CompanyIntro />
        <ContactForm />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default ContactsPage;


