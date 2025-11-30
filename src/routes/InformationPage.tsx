import { IonContent, IonPage, IonSpinner, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon, IonChip } from '@ionic/react';
import { searchOutline, calendarOutline } from 'ionicons/icons';
import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import NewsGrid from '../components/NewsGrid/NewsGrid';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import { fetchStaticData, S3_URLS, getImageUrl } from '../utils/fetchStaticData';
import type { News } from '../types/news';
import styles from './InformationPage.module.css';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  category?: string;
  image: string;
  preview: string;
};

const InformationPage = () => {
  const location = useLocation();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [articlesData, setArticlesData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'news' | 'articles'>('news');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Загружаем новости и статьи параллельно
        const [news, articles] = await Promise.all([
          fetchStaticData<News[]>(S3_URLS.NEWS).catch(() => []),
          fetchStaticData<News[]>(S3_URLS.ARTICLES).catch(() => [])
        ]);
        setNewsData(news);
        setArticlesData(articles);
      } catch (err) {
        console.error('[InformationPage] Ошибка при загрузке данных:', err);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Обработка якорей из URL для переключения табов
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'articles') {
      setActiveTab('articles');
      // Прокручиваем к секции после задержки для рендеринга и загрузки данных
      setTimeout(() => {
        const element = document.getElementById('articles');
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
    } else if (hash === 'news') {
      setActiveTab('news');
      setTimeout(() => {
        const element = document.getElementById('news');
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.hash, loading]);

  // Преобразуем новости и используем реальные URL изображений из S3
  const news: NewsItem[] = useMemo(() => {
    return newsData.map(item => ({
      ...item,
      image: getImageUrl(item.image), // Используем реальные изображения из S3
    }));
  }, [newsData]);

  // Преобразуем статьи и используем реальные URL изображений из S3
  const articles: NewsItem[] = useMemo(() => {
    return articlesData.map(item => ({
      ...item,
      image: getImageUrl(item.image), // Используем реальные изображения из S3
    }));
  }, [articlesData]);

  // Функция для фильтрации по дате
  const filterByDate = (items: NewsItem[], filter: string): NewsItem[] => {
    if (filter === 'all') return items;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return items.filter(item => {
      const itemDate = new Date(item.date);
      
      switch (filter) {
        case 'today':
          return itemDate >= today;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return itemDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return itemDate >= monthAgo;
        case 'year':
          const yearAgo = new Date(today);
          yearAgo.setFullYear(yearAgo.getFullYear() - 1);
          return itemDate >= yearAgo;
        default:
          return true;
      }
    });
  };

  // Функция для поиска по названию
  const filterBySearch = (items: NewsItem[], query: string): NewsItem[] => {
    if (!query.trim()) return items;
    
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.preview.toLowerCase().includes(lowerQuery)
    );
  };

  // Фильтруем и сортируем новости
  const filteredNews = useMemo(() => {
    let filtered = news;
    filtered = filterByDate(filtered, dateFilter);
    filtered = filterBySearch(filtered, searchQuery);
    return filtered.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [news, dateFilter, searchQuery]);

  // Фильтруем и сортируем статьи
  const filteredArticles = useMemo(() => {
    let filtered = articles;
    filtered = filterByDate(filtered, dateFilter);
    filtered = filterBySearch(filtered, searchQuery);
    return filtered.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [articles, dateFilter, searchQuery]);

  // Показываем индикатор загрузки
  if (loading) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <PageHero
              title="Информация"
              subtitle="Новости компании и полезные статьи"
              showCTA={false}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <IonSpinner name="crescent" style={{ width: '48px', height: '48px' }} />
              <p>Загрузка информации...</p>
            </div>
            <CooperationFormSection />
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  // Показываем ошибку
  if (error) {
    return (
      <IonPage>
        <PageWrapper>
          <IonContent>
            <PageHero
              title="Информация"
              subtitle="Новости компании и полезные статьи"
              showCTA={false}
            />
            <div style={{ padding: '40px 16px', textAlign: 'center' }}>
              <h2>Ошибка загрузки данных</h2>
              <p>{error}</p>
            </div>
            <CooperationFormSection />
            <Footer />
          </IonContent>
        </PageWrapper>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <PageWrapper>
        <IonContent>
          <PageHero
            title="Информация"
            subtitle="Новости компании и полезные статьи"
            showCTA={false}
          />
          
          {/* Чипы для переключения между секциями */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
              <IonChip
                className={`${styles.tabChip} ${activeTab === 'news' ? styles.tabChipActive : ''}`}
                onClick={() => setActiveTab('news')}
              >
                Новости компании
              </IonChip>
              <IonChip
                className={`${styles.tabChip} ${activeTab === 'articles' ? styles.tabChipActive : ''}`}
                onClick={() => setActiveTab('articles')}
              >
                Полезные статьи
              </IonChip>
            </div>
          </div>
          
          {/* Секция новостей */}
          {activeTab === 'news' && (
          <section id="news" className={styles.section}>
            <div className={styles.container}>
              {/* Заголовок и фильтры в одной строке */}
              <div className={styles.headerRow}>
                <div className={styles.headerInfo}>
                  <h2 className={styles.sectionTitle}>Новости компании</h2>
                  <p className={styles.sectionDescription}>
                    Узнайте о новых разработках, проектах и событиях, в которых мы участвуем
                  </p>
                </div>
                
                <div className={styles.filters}>
                  <div className={styles.searchContainer}>
                    <IonItem className={styles.searchItem}>
                      <IonIcon icon={searchOutline} slot="start" className={styles.searchIcon} />
                      <IonInput
                        placeholder="Поиск по названию..."
                        value={searchQuery}
                        onIonInput={(e) => setSearchQuery(e.detail.value || '')}
                        className={styles.searchInput}
                      />
                    </IonItem>
                  </div>
                  
                  <div className={styles.dateFilterContainer}>
                    <IonItem className={styles.dateFilterItem}>
                      <IonIcon icon={calendarOutline} slot="start" className={styles.filterIcon} />
                      <IonLabel>Период:</IonLabel>
                      <IonSelect
                        value={dateFilter}
                        onIonChange={(e) => setDateFilter(e.detail.value)}
                        interface="popover"
                        className={styles.dateSelect}
                      >
                        <IonSelectOption value="all">Все время</IonSelectOption>
                        <IonSelectOption value="today">Сегодня</IonSelectOption>
                        <IonSelectOption value="week">За неделю</IonSelectOption>
                        <IonSelectOption value="month">За месяц</IonSelectOption>
                        <IonSelectOption value="year">За год</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </div>
                </div>
              </div>

              {/* Результаты */}
              {filteredNews.length > 0 ? (
                <>
                  <div className={styles.resultsCount}>
                    Найдено новостей: {filteredNews.length}
                  </div>
                  <NewsGrid news={filteredNews} />
                </>
              ) : (
                <div className={styles.emptyState}>
                  <p>Новости не найдены. Попробуйте изменить параметры поиска.</p>
                </div>
              )}
            </div>
          </section>
          )}

          {/* Секция статей */}
          {activeTab === 'articles' && (
          <section id="articles" className={styles.section}>
            <div className={styles.container}>
              {/* Заголовок и фильтры в одной строке */}
              <div className={styles.headerRow}>
                <div className={styles.headerInfo}>
                  <h2 className={styles.sectionTitle}>Полезные статьи</h2>
                  <p className={styles.sectionDescription}>
                    Информационные материалы, руководства и полезные советы для вашего бизнеса
                  </p>
                </div>
                
                <div className={styles.filters}>
                  <div className={styles.searchContainer}>
                    <IonItem className={styles.searchItem}>
                      <IonIcon icon={searchOutline} slot="start" className={styles.searchIcon} />
                      <IonInput
                        placeholder="Поиск по названию..."
                        value={searchQuery}
                        onIonInput={(e) => setSearchQuery(e.detail.value || '')}
                        className={styles.searchInput}
                      />
                    </IonItem>
                  </div>
                  
                  <div className={styles.dateFilterContainer}>
                    <IonItem className={styles.dateFilterItem}>
                      <IonIcon icon={calendarOutline} slot="start" className={styles.filterIcon} />
                      <IonLabel>Период:</IonLabel>
                      <IonSelect
                        value={dateFilter}
                        onIonChange={(e) => setDateFilter(e.detail.value)}
                        interface="popover"
                        className={styles.dateSelect}
                      >
                        <IonSelectOption value="all">Все время</IonSelectOption>
                        <IonSelectOption value="today">Сегодня</IonSelectOption>
                        <IonSelectOption value="week">За неделю</IonSelectOption>
                        <IonSelectOption value="month">За месяц</IonSelectOption>
                        <IonSelectOption value="year">За год</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </div>
                </div>
              </div>

              {/* Результаты */}
              {filteredArticles.length > 0 ? (
                <>
                  <div className={styles.resultsCount}>
                    Найдено статей: {filteredArticles.length}
                  </div>
                  <NewsGrid news={filteredArticles} />
                </>
              ) : (
                <div className={styles.emptyState}>
                  <p>Статьи не найдены. Попробуйте изменить параметры поиска.</p>
                </div>
              )}
            </div>
          </section>
          )}

          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default InformationPage;
