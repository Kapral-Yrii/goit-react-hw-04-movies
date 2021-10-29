import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./components/HomePage/HomePage'))
const MoviePage = lazy(() => import('./components/MoviesPage/MoviesPage'))
const NotFound = lazy(() => import('./components/NotFound/NotFound'))

function App() {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviePage />
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
