import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
