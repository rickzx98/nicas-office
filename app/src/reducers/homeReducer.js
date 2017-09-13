import { SET_HOME_ORDERS, SET_HOME_SEARCH_FIELD } from '../actions/';

import initialState from './initialState';

export default function ordersReducer(state = initialState.home, action) {
  switch (action.type) {
    case SET_HOME_ORDERS: {
      return Object.assign({}, { ...state, orders: action.orders });
    }
    case SET_HOME_SEARCH_FIELD: {
      const newState = Object.assign({}, { ...state });
      newState[action.field] = action.value;
      return newState;
    }
    default:
      return state;
  }
}
