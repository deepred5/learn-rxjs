import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'rxjs';
import App from './App.js';

import './index.css';


import store from './Store.js'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
