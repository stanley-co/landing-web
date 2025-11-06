import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import ProductsSection from '../components/ProductsSection/ProductsSection';
import CompanyIntro from '../components/CompanyIntro/CompanyIntro';
import Applications from '../components/Applications/Applications';
import Certificates from '../components/Certificates/Certificates';
import Gallery from '../components/Gallery/Gallery';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import ContactForm from '../components/ContactForm/ContactForm';
import Footer from '../components/Footer/Footer';

const HomePage = () => (
  <IonPage>
    <PageWrapper>
      <IonContent>
        <Hero />
        <Features />
        <ProductsSection />
        <CompanyIntro />
        <Applications />
        <Certificates />
        <Gallery />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <Footer />
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default HomePage;


