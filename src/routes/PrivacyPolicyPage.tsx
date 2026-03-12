import { IonContent, IonPage } from '@ionic/react';
import PageWrapper from '../components/layout/PageWrapper';
import DocumentHead from '../components/DocumentHead/DocumentHead';
import styles from './PrivacyPolicyPage.module.css';

const PrivacyPolicyPage = () => (
  <IonPage>
    <DocumentHead
      title="Политика конфиденциальности — kitexp.ru"
      description="Политика конфиденциальности сайта kitexp.ru: какие данные собираются, как они используются и защищаются."
      canonicalPath="/privacy-policy"
    />
    <PageWrapper>
      <IonContent>
        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.header}>
              <h1 className={styles.title}>Политика конфиденциальности сайта kitexp.ru</h1>
              <p className={styles.effectiveDate}>Дата вступления в силу: 07.03.2026</p>
              <p className={styles.intro}>
                Настоящая Политика конфиденциальности описывает, какие персональные данные собираются на сайте kitexp.ru,
                как они используются, защищаются и передаются третьим лицам. Используя сайт, вы соглашаетесь с условиями данной политики.
              </p>
            </header>

            <div className={styles.content}>
              <section className={styles.block}>
                <h2 className={styles.blockTitle}>1. Сбор персональных данных</h2>
                <p className={styles.paragraph}>Мы можем собирать следующие данные:</p>

                <h3 className={styles.subTitle}>Персональные данные, предоставленные вами напрямую:</h3>
                <ul className={styles.list}>
                  <li>ФИО, адрес электронной почты, телефон, адрес доставки, комментарии к заказам.</li>
                  <li>Данные, предоставленные через формы обратной связи, подписки, регистрации или заявки.</li>
                </ul>

                <h3 className={styles.subTitle}>Автоматически собираемые данные:</h3>
                <ul className={styles.list}>
                  <li>IP-адрес, тип устройства, браузер, операционная система.</li>
                  <li>Данные о посещенных страницах, действиях на сайте, времени посещения.</li>
                </ul>

                <h3 className={styles.subTitle}>Файлы cookie и аналогичные технологии:</h3>
                <ul className={styles.list}>
                  <li>Для поддержания сессий пользователя, аналитики, персонализации и рекламы.</li>
                  <li>Для сбора статистики посещений и улучшения работы сайта.</li>
                </ul>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>2. Цели обработки данных</h2>
                <p className={styles.paragraph}>Персональные данные используются для:</p>
                <ul className={styles.list}>
                  <li>Обеспечения работы сайта и предоставления услуг.</li>
                  <li>Обработки заказов, доставки продукции, связи с клиентами.</li>
                  <li>Анализа посещаемости и улучшения функциональности сайта.</li>
                  <li>Отправки информационных и маркетинговых рассылок (только при вашем согласии).</li>
                  <li>Соблюдения законодательства РФ и требований контролирующих органов.</li>
                  <li>Интеграции с сервисами третьих сторон (аналитика, платежные системы, CRM).</li>
                </ul>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>3. Передача данных третьим лицам</h2>
                <p className={styles.paragraph}>Ваши данные могут передаваться:</p>
                <ul className={styles.list}>
                  <li>
                    Сервисам и подрядчикам, которые участвуют в предоставлении услуг, в том числе:
                    платежные системы (например, онлайн-оплата заказов), сервисы доставки товаров,
                    CRM и системы обработки заказов, сервисы аналитики (Google Analytics, Яндекс.Метрика).
                  </li>
                  <li>Государственным органам, если это требуется законом.</li>
                </ul>
                <p className={styles.paragraph}>
                  Ваши данные не продаются и не передаются третьим лицам для маркетинговых целей без вашего согласия.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>4. Использование cookies и аналогичных технологий</h2>
                <p className={styles.paragraph}>
                  Сайт использует cookies и технологии отслеживания для:
                </p>
                <ul className={styles.list}>
                  <li>Поддержания сессий пользователя.</li>
                  <li>Анализа посещаемости сайта и улучшения функционала.</li>
                  <li>Персонализации контента и рекламы (при вашем согласии).</li>
                </ul>
                <p className={styles.paragraph}>
                  Вы можете управлять cookies через настройки браузера или отказаться от их использования.
                  Ограничение cookies может повлиять на работу сайта.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>5. Подписки и рассылки</h2>
                <p className={styles.paragraph}>
                  При подписке на новости и рассылки:
                </p>
                <ul className={styles.list}>
                  <li>Мы сохраняем ваш email для отправки уведомлений и акций.</li>
                  <li>
                    Вы можете в любой момент отписаться через ссылку в письме или через контактный email{' '}
                    <a href="mailto:info@kitexp.ru" className={styles.link}>info@kitexp.ru</a>.
                  </li>
                  <li>Отправка маркетинговых материалов осуществляется только при вашем согласии.</li>
                </ul>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>6. Хранение и защита данных</h2>
                <ul className={styles.list}>
                  <li>Данные хранятся только необходимое время для выполнения целей обработки.</li>
                  <li>
                    Применяются технические, программные и организационные меры для защиты данных
                    от несанкционированного доступа, утраты или изменения.
                  </li>
                  <li>Доступ к персональным данным имеют только уполномоченные сотрудники.</li>
                </ul>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>7. Права пользователей</h2>
                <p className={styles.paragraph}>Вы имеете право:</p>
                <ul className={styles.list}>
                  <li>Получать информацию о своих данных, которые обрабатываются на сайте.</li>
                  <li>Требовать исправления, удаления или ограничения обработки ваших персональных данных.</li>
                  <li>Отозвать согласие на обработку данных в любой момент.</li>
                  <li>Подавать жалобы в уполномоченные органы по защите персональных данных.</li>
                </ul>
                <p className={styles.paragraph}>
                  Для реализации своих прав пишите на{' '}
                  <a href="mailto:info@kitexp.ru" className={styles.link}>info@kitexp.ru</a>.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>8. Интеграции с сервисами третьих сторон</h2>
                <p className={styles.paragraph}>
                  На сайте могут использоваться сторонние сервисы:
                </p>
                <ul className={styles.list}>
                  <li>Аналитика: Google Analytics, Яндекс.Метрика — для анализа посещаемости.</li>
                  <li>CRM и маркетинговые сервисы — для обработки заказов и рассылок.</li>
                  <li>Платежные системы — для безопасной оплаты товаров.</li>
                </ul>
                <p className={styles.paragraph}>
                  Все сервисы действуют в рамках законодательства РФ и международных стандартов по защите данных.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>9. Изменения в Политике</h2>
                <p className={styles.paragraph}>
                  Мы можем обновлять Политику конфиденциальности. Все изменения публикуются на этой странице
                  с указанием даты вступления в силу. Рекомендуем периодически проверять актуальную версию.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>10. Контакты</h2>
                <p className={styles.paragraph}>
                  По вопросам конфиденциальности и обработки данных:
                </p>
                <ul className={styles.list}>
                  <li>Email: <a href="mailto:info@kitexp.ru" className={styles.link}>info@kitexp.ru</a></li>
                  <li>Телефон: <a href="tel:+79122892265" className={styles.link}>+7 915 013 36-09</a></li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </IonContent>
    </PageWrapper>
  </IonPage>
);

export default PrivacyPolicyPage;

