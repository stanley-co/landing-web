import { IonButton, IonIcon } from '@ionic/react';
import { logoFacebook, logoLinkedin, paperPlaneOutline, mailOutline, arrowBackOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import styles from "./ArticleShare.module.css";

type ArticleShareProps = {
  title: string;
  url: string;
};

const ArticleShare = ({ title, url }: ArticleShareProps) => {
  const navigate = useNavigate();
  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
        break;
      default:
        break;
    }
  };

  return (
    <section className={styles.share}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.shareButtons}>
            <span className={styles.shareLabel}>Поделиться:</span>
            <IonButton
              fill="clear"
              size="small"
              onClick={() => handleShare('facebook')}
              className={styles.shareButton}
            >
              <IonIcon icon={logoFacebook} />
            </IonButton>
            <IonButton
              fill="clear"
              size="small"
              onClick={() => handleShare('linkedin')}
              className={styles.shareButton}
            >
              <IonIcon icon={logoLinkedin} />
            </IonButton>
            <IonButton
              fill="clear"
              size="small"
              onClick={() => handleShare('telegram')}
              className={styles.shareButton}
            >
              <IonIcon icon={paperPlaneOutline} />
            </IonButton>
            <IonButton
              fill="clear"
              size="small"
              onClick={() => handleShare('email')}
              className={styles.shareButton}
            >
              <IonIcon icon={mailOutline} />
            </IonButton>
          </div>
          <IonButton
            fill="outline"
            onClick={() => navigate('/news')}
            className={styles.backButton}
          >
            <IonIcon icon={arrowBackOutline} slot="start" />
            Вернуться к новостям
          </IonButton>
        </div>
      </div>
    </section>
  );
};

export default ArticleShare;

