import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { History } from './pages/History';
import { Favorites } from './pages/Favorites';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Recipe } from './pages/Recipe';

function App() {
  return (
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
  );
}

export default App;
