import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import Gallery from "./components/Gallery/Gallery";
import Testimonials from "./components/Testimonials/Testimonials";
import FAQ from "./components/FAQ/FAQ";
import ContactForm from "./components/ContactForm/ContactForm";
import Footer from "./components/Footer/Footer";
import CompanyIntro from "./components/CompanyIntro/CompanyIntro";
import Applications from "./components/Applications/Applications";
import Certificates from "./components/Certificates/Certificates";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container">
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
