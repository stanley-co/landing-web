import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import Hero from '../components/Hero/Hero';
import AboutSection from '../components/AboutSection/AboutSection';
import Features from '../components/Features/Features';
import ProductsPreview from '../components/ProductsPreview/ProductsPreview';
import Advantages from '../components/Advantages/Advantages';
import Certificates from '../components/Certificates/Certificates';
import NewsPreview from '../components/NewsPreview/NewsPreview';
import Footer from '../components/Footer/Footer';

const HomePage = () => (
  <IonPage>
    <DocumentHead
      title="Главная — ФКИТ"
      description="ФКИТ: промышленное оборудование для производства. Вакуумные эмульгаторы, миксеры, дозаторы, насосы."
      canonicalPath="/home"
    />
    <PageWrapper>
      <IonContent>
        <Hero />
        <AboutSection />
        <Features />
        <ProductsPreview />
        <Advantages />
        <Certificates />
        <NewsPreview />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default HomePage;


