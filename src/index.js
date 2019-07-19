import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Provider } from 'react-redux';

import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import 'normalize.css';
import './index.scss';

import PagedApp from './containers/PagedApp';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <PagedApp />
  </Provider>,
  document.getElementById('root')
);

ReactModal.setAppElement('#main');