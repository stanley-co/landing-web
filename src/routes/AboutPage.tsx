import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import CompanyIntro from '../components/CompanyIntro/CompanyIntro';
import Certificates from '../components/Certificates/Certificates';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <IonPage>
      <PageWrapper>
        <IonContent>
          {/* Секция "О нас" */}
          <section id="about-us" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h1 className={styles.pageTitle}>О компании</h1>
                <div className={styles.pageDivider} />
              </div>
              <CompanyIntro />
            </div>
          </section>

          {/* Секция "Наши компетенции" */}
          <section id="competences" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Наши компетенции</h2>
                <div className={styles.sectionDivider} />
                <p className={styles.sectionDescription}>
                  Профессиональные знания и опыт в области промышленного оборудования
                </p>
              </div>
              <div className={styles.competencesGrid}>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>🔬</div>
                  <h3 className={styles.competenceTitle}>Исследования и разработка</h3>
                  <p className={styles.competenceDescription}>
                    Постоянные исследования и инновации в области технологий производства
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>🏭</div>
                  <h3 className={styles.competenceTitle}>Производство</h3>
                  <p className={styles.competenceDescription}>
                    Современное производство с применением передовых технологий и материалов
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>🔧</div>
                  <h3 className={styles.competenceTitle}>Установка и сервис</h3>
                  <p className={styles.competenceDescription}>
                    Профессиональная установка и комплексное сервисное обслуживание оборудования
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>💡</div>
                  <h3 className={styles.competenceTitle}>Инновации</h3>
                  <p className={styles.competenceDescription}>
                    Внедрение инновационных решений и адаптация под специфические требования клиентов
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>🌍</div>
                  <h3 className={styles.competenceTitle}>Международный опыт</h3>
                  <p className={styles.competenceDescription}>
                    Работа с клиентами по всему миру, соответствие международным стандартам
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>✅</div>
                  <h3 className={styles.competenceTitle}>Качество</h3>
                  <p className={styles.competenceDescription}>
                    Строгий контроль качества на всех этапах производства и поставки
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Секция "Сертификаты" */}
          <section id="certificates" className={styles.section}>
            <div className={styles.container}>
              <Certificates />
            </div>
          </section>

          {/* Секция "Наши клиенты" */}
          <section id="clients" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Наши клиенты</h2>
                <div className={styles.sectionDivider} />
                <p className={styles.sectionDescription}>
                  Мы гордимся сотрудничеством с ведущими компаниями в различных отраслях промышленности
                </p>
              </div>
              <div className={styles.clientsGrid}>
                <div className={styles.clientCard}>
                  <div className={styles.clientLogo}>Клиент 1</div>
                  <p className={styles.clientName}>Фармацевтическая компания</p>
                </div>
                <div className={styles.clientCard}>
                  <div className={styles.clientLogo}>Клиент 2</div>
                  <p className={styles.clientName}>Косметическое производство</p>
                </div>
                <div className={styles.clientCard}>
                  <div className={styles.clientLogo}>Клиент 3</div>
                  <p className={styles.clientName}>Пищевая промышленность</p>
                </div>
                <div className={styles.clientCard}>
                  <div className={styles.clientLogo}>Клиент 4</div>
                  <p className={styles.clientName}>Химическое производство</p>
                </div>
                <div className={styles.clientCard}>
                  <div className={styles.clientLogo}>Клиент 5</div>
                  <p className={styles.clientName}>Производство клеев</p>
                </div>
                <div className={styles.clientCard}>
                  <div className={styles.clientLogo}>Клиент 6</div>
                  <p className={styles.clientName}>Лабораторное оборудование</p>
                </div>
              </div>
            </div>
          </section>

          <CooperationFormSection />
          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default AboutPage;
