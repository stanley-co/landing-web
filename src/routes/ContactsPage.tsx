import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import ContactInfo from '../components/ContactInfo/ContactInfo';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';

const ContactsPage = () => (
  <IonPage>
    <DocumentHead
      title="Контакты — ФКИТ"
      description="Контакты ФКИТ: адрес, телефон, форма обратной связи. Свяжитесь с нами по вопросам промышленного оборудования."
      canonicalPath="/contacts"
    />
    <PageWrapper>
      <IonContent>
        <ContactInfo />
        <CooperationFormSection />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default ContactsPage;