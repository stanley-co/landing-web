import { IonImg } from '@ionic/react';
import styles from "./ArticleBody.module.css";

type ContentBlock = {
  type: 'paragraph' | 'image' | 'quote';
  text?: string;
  src?: string;
  caption?: string;
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

