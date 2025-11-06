import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import ProductsSection from '../components/ProductsSection/ProductsSection';
import Footer from '../components/Footer/Footer';

const EquipmentPage = () => (
  <IonPage>
    <PageWrapper>
      <IonContent>
        <ProductsSection />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default EquipmentPage;


