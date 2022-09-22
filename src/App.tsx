/* eslint-disable react/jsx-no-constructed-context-values */
import React, { Suspense, lazy, useState } from 'react';
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
import { UserAppContext } from './context/userContext';
import { UserContext } from './types/models';
import UserDataHandlerToLS from './utils/userDataWriter';

const Search = lazy(() => import('./pages/Search'));
const Recipe = lazy(() => import('./pages/Recipe'));

function App() {
  const { email } = UserDataHandlerToLS.getCurrentUser();
  let favoritesQuantity = 0;
  if (email) {
    favoritesQuantity = UserDataHandlerToLS.getFavorites(email).length;
  }
  const [favorites, setFavorites] = useState(favoritesQuantity);
  const appContext: UserContext = {
    favorites,
    setFavorites,
  };
  return (
    <ErrorBoundary>
      <UserAppContext.Provider value={appContext}>
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
      </UserAppContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
