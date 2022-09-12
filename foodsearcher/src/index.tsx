import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import './index.css';
import App from './App';

const docRoot = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(docRoot);
root.render(
  <Router>
    <App />
  </Router>
);

