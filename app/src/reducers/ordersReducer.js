import { ADD_ORDER, LOAD_ORDERS, REMOVE_ORDER, UPDATE_ORDER } from '../actions/';

import { Order } from '../api/order/';
import initialState from './initialState';

export default function ordersReducer(state = initialState.orders, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return Object.assign({}, { ...state, ...action.orders });
    case ADD_ORDER: {
      const orders = [...state.docs];
      orders.push(action.order);
      return Object.assign({}, { ...state, docs: orders });
    }
    case REMOVE_ORDER: {
      const orders = [...state.docs];
      orders.forEach((order, index) => {
        if (order[Order.ORDER_ID] === order.orderId) {
          orders.splice(index, 1);
        }
      });
      return Object.assign({}, { ...state, docs: orders });
    }
    case UPDATE_ORDER: {
      const orders = [...state.docs];
      orders.forEach((order, index) => {
        if (order[Order.ORDER_ID] === order.orderId) {
          orders[index] = action.order;
        }
      });
      return Object.assign({}, { ...state, docs: orders });
    }
    default:
      return state;
  }
}
