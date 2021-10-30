import React, { FC, useState, useContext, useCallback, useEffect } from 'react';
import styles from './App.module.css';
import ArticleContainer from './components/ArticleContainer';
import AuthorList from './components/AuthorList';
import Button from './components/Button';
import Header from './components/Header';
import ArticleDetails from './components/ArticleDetails';
import CommentsPage from './components/CommentsPage';
import { Article } from 'types/Article';
import { Author } from 'types/Author';
import Preloader from 'components/Preloader';
import { ThemeContext } from './components/ThemeContext';
import { THEMES } from 'constants/THEMES';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

const App: FC<{}> = (props) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isArticlesLoaded, setIsArticlesLoaded] = useState(false);
  const [isAuthorsLoaded, setIsAuthorsLoaded] = useState(false);

  const getArticles = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response): Promise<Article[]> => {
        return response.json();
      })
      .then((data) => {
        setArticles(data);
        setIsArticlesLoaded(true);
      })
      .catch((e) => console.error(e));
  };

  const getAuthors = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response): Promise<Author[]> => {
        return response.json();
      })
      .then((data) => {
        setAuthors(data);
        setIsAuthorsLoaded(true);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getArticles();
    getAuthors();
  }, []);

  const toggleTheme = useCallback(() => {
    if (theme === THEMES.LIGHT) {
      setTheme(THEMES.DARK);
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      setTheme(THEMES.LIGHT);
      document.documentElement.removeAttribute('theme');
    }
  }, [theme, setTheme]);

  return (
    <Router>
      <div className={styles.App}>
        <Header>
          <ul className={styles.headerList}>
            <li className={styles.headerListItem}>
              <NavLink
                to="/posts"
                className={styles.link}
                activeClassName={styles.activeLink}
                exact
              >
                Posts
              </NavLink>
            </li>
            <li className={styles.headerListItem}>
              <NavLink
                to="/users"
                className={styles.link}
                activeClassName={styles.activeLink}
                exact
              >
                Users
              </NavLink>
            </li>
          </ul>
          <Button text="Change theme" onClick={toggleTheme} themeButton />
        </Header>

        <Switch>
          <Route path="/posts" exact>
            <h1 className={styles.title}>My Site {theme}</h1>
            <h2 className={styles.subTitle}>Posts</h2>
            {!isArticlesLoaded && !isAuthorsLoaded ? (
              <Preloader />
            ) : (
              <ArticleContainer
                /* displayLimit={displayLimit} */
                articles={articles}
                authors={authors}
              />
            )}
          </Route>
          <Route path="/users" exact>
            <h2 className={styles.subTitle}>Users</h2>
            {!isAuthorsLoaded ? (
              <Preloader />
            ) : (
              <AuthorList authors={authors} />
            )}
          </Route>
          <Route path="/posts/:postId" exact>
            <ArticleDetails articles={articles} />
          </Route>
          <Route path="/posts/:postId/comments" exact>
            <CommentsPage />
          </Route>
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
