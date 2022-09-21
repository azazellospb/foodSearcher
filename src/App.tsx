import React, { Suspense, lazy } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Favorites } from './pages/Favorites';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { ErrorBoundary } from './components/ErrorBoundary';

const Search = lazy(() => import('./pages/Search'));
const Recipe = lazy(() => import('./pages/Recipe'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/history" element={<History />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
