import { isFormDisabled } from '../../config/bitrix';
import CooperationForm from '../CooperationForm/CooperationForm';
import styles from "./CooperationFormSection.module.css";

type CooperationFormSectionProps = {
  title?: string;
  subtitle?: string;
};

const DEFAULT_TITLE = '';
const DEFAULT_SUBTITLE = 'Заполните форму, и наш специалист свяжется с вами, чтобы обсудить проект или подобрать оборудование.';

const CooperationFormSection = ({ title = DEFAULT_TITLE, subtitle = DEFAULT_SUBTITLE }: CooperationFormSectionProps) => {
  // Проверяем, отключена ли форма
  if (isFormDisabled()) {
    console.log('[CooperationFormSection] Form is disabled. Returning null.');
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <CooperationForm showHeader={true} />
      </div>
    </section>
  );
};

export default CooperationFormSection;

