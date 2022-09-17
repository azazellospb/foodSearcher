/* eslint-disable react/no-children-prop */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';

const docRoot = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(docRoot);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
