import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import ProductSpecs from '../components/ProductSpecs/ProductSpecs';
import ProductDescription from '../components/ProductDescription/ProductDescription';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import productsData from '../data/products.json';
import testImage from '../assets/images/test-image.png';

const ProductDetailPage = () => {
  const { id } = useParams();
  
  // Находим продукт по ID
  const product = productsData.find(p => p.id === id);
  
  if (!product) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <div style={{ padding: '80px 16px', textAlign: 'center' }}>
              <h2>Оборудование не найдено</h2>
              <p>Запрашиваемый продукт не существует.</p>
            </div>
            <CooperationFormSection />
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  // Используем локальное изображение (можно расширить позже с реальными изображениями)
  const images = [testImage, testImage, testImage];

  return (
    <IonPage>
      <PageWrapper>
        <IonContent>
          <ProductHeader
            name={product.name}
            category={product.category}
            description={product.description}
          />
          <ProductGallery images={images} productName={product.name} />
          <ProductSpecs specs={product.specs} />
          <ProductDescription
            name={product.name}
            description={product.description}
            fullDescription={product.fullDescription}
          />
          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default ProductDetailPage;


