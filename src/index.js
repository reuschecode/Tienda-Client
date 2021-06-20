import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'

axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);