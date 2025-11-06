import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import ProductsSection from '../components/ProductsSection/ProductsSection';
import Footer from '../components/Footer/Footer';

const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <IonPage>
      <PageWrapper>
        <IonContent>
          {/* TODO: заменить на реальную галерею и спецификации товара */}
          <h2 style={{ padding: 16 }}>Карточка оборудования: {id}</h2>
          <ProductsSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default ProductDetailPage;


