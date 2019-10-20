import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './app/App';
import { AuthProvider } from './context/authContext';
import Navbar from './layout/Navbar';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <Navbar />
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById('root'),
);
