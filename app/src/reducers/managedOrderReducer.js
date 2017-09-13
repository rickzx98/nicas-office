import { CANCEL_MANAGED_ORDER, INVALID_MANAGED_ORDER, SET_MANAGED_ORDER, SET_MANAGED_ORDER_FIELD } from '../actions/';

import { Order } from '../api/order/';
import initialState from './initialState';

export default function managedOrderReducer(state = initialState.managedOrder, action) {
  switch (action.type) {
    case SET_MANAGED_ORDER: {
      const customerName = [action.order[Order.CUSTOMER_NAME]];
      return Object.assign({}, { ...state, ...action.order, customerName, active: true, update: true });
    }
    case CANCEL_MANAGED_ORDER: {
      return initialState.managedOrder;
    }
    case SET_MANAGED_ORDER_FIELD: {
      if (Object.values(Order).indexOf(action.field) > -1) {
        state = Object.assign({}, { ...state, touched: true, active: true });
        state[action.field] = action.value;
        if (state.invalid && state.invalidField === action.field) {
          state.invalid = false;
          state.invalidMessage = undefined;
          state.invalidField = undefined;
        }
      }
      return state;
    }
    case INVALID_MANAGED_ORDER: {
      return Object.assign({}, { ...state, invalidField: action.field, invalidMessage: action.message, invalid: true });
    }
    default:
      return state;
  }
}
