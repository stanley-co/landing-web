import styles from "./ProductVideo.module.css";

type ProductVideoProps = {
  videoUrl: string;
};

const ProductVideo = ({ videoUrl }: ProductVideoProps) => {
  // Преобразуем URL из формата https://rutube.ru/video/... в формат embed
  const getEmbedUrl = (url: string): string => {
    // Извлекаем ID видео из URL
    // Формат: https://rutube.ru/video/6d0bef4e12a4b0f3d6ab3ec31fa1b2e7/
    const match = url.match(/rutube\.ru\/video\/([a-f0-9]+)/i);
    if (match && match[1]) {
      return `https://rutube.ru/play/embed/${match[1]}/`;
    }
    // Если не удалось извлечь ID, возвращаем исходный URL (на случай другого формата)
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section className={styles.video}>
      <div className={styles.container}>
        <h2 className={styles.title}>Видео</h2>
        <div className={styles.videoWrapper}>
          <iframe
            width="900"
            height="450"
            src={embedUrl}
            style={{ border: 'none' }}
            allow="clipboard-write; autoplay"
            allowFullScreen
            className={styles.iframe}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductVideo;

