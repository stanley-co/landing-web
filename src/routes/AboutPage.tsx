import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import CompanyIntro from '../components/CompanyIntro/CompanyIntro';
import CooperationFormSection from '../components/CooperationFormSection/CooperationFormSection';
import Footer from '../components/Footer/Footer';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <IonPage>
      <DocumentHead
        title="О компании — ФКИТ"
        description="О компании ФКИТ: миссия, сертификаты, сотрудничество. Промышленное оборудование для производства."
        canonicalPath="/about"
      />
      <PageWrapper>
        <IonContent>
          {/* Секция "О нас" */}
          <section id="about-us" className={styles.section}>
            <div className={styles.container}>
              <CompanyIntro />
            </div>
          </section>

          {/* Секция "Миссия" */}
          <section id="mission" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Наша миссия</h2>
                <div className={styles.sectionDivider} />
                <p className={styles.sectionDescription}>
                  Мы меняем правила игры: делаем производство лёгким в управлении, а его процессы — абсолютно прозрачными для бизнеса.
                </p>
              </div>
            </div>
          </section>

          {/* Секция "Наши компетенции" */}
          <section id="competences" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Наши компетенции</h2>
                <div className={styles.sectionDivider} />
                <p className={styles.sectionDescription}>
                  Опыт команды: наши специалисты обладают более чем 15-летним опытом: работы в крупных международных компаниях; разработки сложных технологических проектов; компоновки и запуска машин на базе интегрированной автоматики.
                </p>
              </div>
              <div className={styles.competencesGrid}>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>🔬</div>
                  <h3 className={styles.competenceTitle}>Инжиниринг</h3>
                  <p className={styles.competenceDescription}>
                    Разработка проектов различного уровня сложности. Организация производства «под ключ»
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>🏭</div>
                  <h3 className={styles.competenceTitle}>Комплексная автоматизация</h3>
                  <p className={styles.competenceDescription}>
                    Полная автоматизация производства. Мы максимально придерживаемся в своей работе принципа производства «тёмная фабрика»
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>🔧</div>
                  <h3 className={styles.competenceTitle}>Оптимизация производства</h3>
                  <p className={styles.competenceDescription}>
                    Проводим анализ производственных потерь, внедряем методологию для эффективной и быстрой минимизации потерь.
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>💡</div>
                  <h3 className={styles.competenceTitle}>Поставка оборудования</h3>
                  <p className={styles.competenceDescription}>
                    Подберём оптимальный вариант оборудования под требуемые задачи по наиболее важным для вас критериям.
                  </p>
                </div>
                <div className={styles.competenceCard}>
                  <div className={styles.competenceIcon}>🌍</div>
                  <h3 className={styles.competenceTitle}>Монтаж и сервис</h3>
                  <p className={styles.competenceDescription}>
                    Интегрируем новое оборудование в существующие технологические цепочки с минимальным временем простоя основного производства. Поможем организовать высокоэффективный процесс обслуживания оборудования.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Секция "Форма сотрудничества" */}
          <CooperationFormSection
            title="Начните сотрудничество с нами"
            subtitle="Свяжитесь с нами для получения консультации и расчёта стоимости оборудования"
          />

          <Footer />
        </IonContent>
      </PageWrapper>
    </IonPage>
  );
};

export default AboutPage;
