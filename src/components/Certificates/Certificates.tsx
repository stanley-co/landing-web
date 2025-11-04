import { IonCard, IonGrid, IonRow, IonCol } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import styles from "./Certificates.module.css";

const certificates = [
  { name: "ISO9001:2000", description: "Система менеджмента качества" },
  { name: "CE", description: "Европейское соответствие" },
  { name: "GMP", description: "Надлежащая производственная практика" },
  { name: "FDA", description: "Сертификация FDA" },
  { name: "ISO 14001", description: "Экологический менеджмент" },
  { name: "OHSAS 18001", description: "Безопасность труда" },
];

const Certificates = () => (
  <section id="certificates" className={styles.certificates}>
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Сертификаты и стандарты</h2>
      <IonGrid>
        <IonRow>
          {certificates.map((cert, idx) => (
            <IonCol size="12" sizeMd="6" sizeLg="4" key={idx}>
              <IonCard className={styles.certCard}>
                <div className={styles.certContent}>
                  <IonIcon icon={checkmarkCircleOutline} className={styles.certIcon} />
                  <h3 className={styles.certName}>{cert.name}</h3>
                  <p className={styles.certDesc}>{cert.description}</p>
                </div>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  </section>
);

export default Certificates;


