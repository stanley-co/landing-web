import { IonApp } from '@ionic/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import EquipmentPage from './routes/EquipmentPage';
import ProductDetailPage from './routes/ProductDetailPage';
import NewsPage from './routes/NewsPage';
import NewsArticlePage from './routes/NewsArticlePage';
import ContactsPage from './routes/ContactsPage';

const App = () => {
  return (
    <IonApp>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/equipment/:id" element={<ProductDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsArticlePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
