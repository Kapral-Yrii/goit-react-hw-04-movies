import s from './App.module.css';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./components/HomePage/HomePage'))
const MoviePage = lazy(() => import('./components/MoviesPage/MoviesPage'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage/MovieDetailsPage'))

function App() {
  return (
    <div className={s.app}>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviePage />
          </Route>
          <Route path="/movies/:moviesid">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
