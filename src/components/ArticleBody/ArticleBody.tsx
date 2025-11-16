import { IonImg, IonIcon } from '@ionic/react';
import { openOutline } from 'ionicons/icons';
import styles from "./ArticleBody.module.css";

type ContentBlock = {
  type: 'paragraph' | 'image' | 'quote' | 'link';
  text?: string;
  src?: string;
  caption?: string;
  url?: string;
  linkText?: string;
};

type ArticleBodyProps = {
  content: ContentBlock[];
};

const ArticleBody = ({ content }: ArticleBodyProps) => {
  return (
    <section className={styles.body}>
      <div className={styles.container}>
        <div className={styles.content}>
          {content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={index} className={styles.paragraph}>
                    {block.text}
                  </p>
                );
              
              case 'image':
                return (
                  <figure key={index} className={styles.figure}>
                    <IonImg src={block.src} alt={block.caption || ''} className={styles.image} />
                    {block.caption && (
                      <figcaption className={styles.caption}>{block.caption}</figcaption>
                    )}
                  </figure>
                );
              
              case 'quote':
                return (
                  <blockquote key={index} className={styles.quote}>
                    <p className={styles.quoteText}>{block.text}</p>
                  </blockquote>
                );
              
              case 'link':
                return (
                  <div key={index} className={styles.linkBlock}>
                    <a 
                      href={block.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                    >
                      <span className={styles.linkText}>{block.linkText || block.url}</span>
                      <IonIcon icon={openOutline} className={styles.linkIcon} />
                    </a>
                    {block.text && (
                      <p className={styles.linkDescription}>{block.text}</p>
                    )}
                  </div>
                );
              
              default:
                return null;
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default ArticleBody;

