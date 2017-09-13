/* eslint-disable import/default */
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './theme/bootstrap/bootstrap.css';

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import Root from './components/Root';
import { browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';

require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
