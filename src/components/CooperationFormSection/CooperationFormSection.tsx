import { isFormDisabled } from '../../config/bitrix';
import CooperationForm from '../CooperationForm/CooperationForm';
import styles from "./CooperationFormSection.module.css";

const CooperationFormSection = () => {
  // Проверяем, отключена ли форма
  if (isFormDisabled()) {
    console.log('[CooperationFormSection] Form is disabled. Returning null.');
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Готовы начать сотрудничество?</h2>
          <p className={styles.subtitle}>
            Заполните форму, и наш специалист свяжется с вами, чтобы обсудить проект или подобрать оборудование.
          </p>
        </div>
        <CooperationForm showHeader={true} />
      </div>
    </section>
  );
};

export default CooperationFormSection;

