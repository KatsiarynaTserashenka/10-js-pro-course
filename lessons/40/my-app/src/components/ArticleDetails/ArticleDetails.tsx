import React, { FC } from 'react';
import styles from './ArticleDetails.module.css';
import { Article } from 'types/Article';
import { Link, generatePath, useParams } from 'react-router-dom';
import { RoutePath } from 'constants/RoutePath';

interface IProps {
  articles: Article[];
}

const ArticleDetails: FC<IProps> = (props) => {
  const { articles } = props;
  const params = useParams<{ postId: string }>();

  const article = articles.find((article) => {
    return article.id === parseInt(params.postId);
  });

  return (
    <div className={styles.article}>
      <h2 className={styles.pageTitle}>Post details</h2>
      <div>
        <h3 className={styles.articleTitle}>{article && article.title}</h3>
        <p className={styles.articleBody}>{article && article.body}</p>
      </div>
      <Link
        to={generatePath(RoutePath.comments, {
          postId: article?.id!,
        })}
        className={styles.link}
      >
        Comments
      </Link>
    </div>
  );
};

export default ArticleDetails;