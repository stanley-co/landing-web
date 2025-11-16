import { IonApp } from '@ionic/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './routes/HomePage';
import EquipmentPage from './routes/EquipmentPage';
import ProductDetailPage from './routes/ProductDetailPage';
import InformationPage from './routes/InformationPage';
import AboutPage from './routes/AboutPage';
import NewsArticlePage from './routes/NewsArticlePage';
import ContactsPage from './routes/ContactsPage';
import NotFoundPage from './routes/NotFoundPage';

const App = () => {
  return (
    <IonApp>
      <BrowserRouter>
        <Routes>
          {/* Оборудование - стартовая страница */}
          <Route path="/" element={<EquipmentPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/equipment/:id" element={<ProductDetailPage />} />
          
          {/* Новые страницы */}
          <Route path="/information" element={<InformationPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Контакты */}
          <Route path="/contacts" element={<ContactsPage />} />
          
          {/* Старые маршруты для обратной совместимости */}
          <Route path="/news" element={<Navigate to="/information#news" replace />} />
          <Route path="/news/:id" element={<NewsArticlePage />} />
          
          {/* Главная страница (старая) - перенаправляем на оборудование */}
          <Route path="/home" element={<HomePage />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
