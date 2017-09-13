import ajaxGlobal from './ajaxGlobalReducer';
import { combineReducers } from 'redux';
import customers from './customersReducer';
import dialog from './appModalReducer';
import home from './homeReducer';
import managedOrder from './managedOrderReducer';
import notifications from './notificationsReducer';
import orders from './ordersReducer';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
const rootReducer = combineReducers({
  managedOrder,
  customers,
  orders,
  dialog,
  notifications,
  ajaxGlobal,
  user,
  home,
  routing: routerReducer
});

export default rootReducer;
