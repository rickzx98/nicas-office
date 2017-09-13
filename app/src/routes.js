import { IndexRoute, Route } from 'react-router';

import AboutPage from './components/AboutPage';
import App from './components/App'; // eslint-disable-line import/no-named-as-default
import { ConnectedCustomersPage } from './containers/CustomersPage';
import { ConnectedHomePage } from './containers/HomePage';
import { ConnectedManagedOrderPage } from './containers/ManagedOrderPage';
import { ConnectedOrdersPage } from './containers/OrdersPage';
import NotFoundPage from './components/NotFoundPage';
import React from 'react';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={ConnectedHomePage} />
    <Route path="customers" component={ConnectedCustomersPage} />
    <Route path="customers/:customerId" component={ConnectedCustomersPage} />
    <Route path="orders" component={ConnectedOrdersPage} />
    <Route path="orders/:orderId" component={ConnectedManagedOrderPage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
