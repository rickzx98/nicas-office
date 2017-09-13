import * as ajaxActions from './AjaxStatusActions';
import * as types from './';

import { Order, Api as orderApi } from '../api/order/';

import { GetValidationError } from '../utils/';

export function getOrderById(orderId) {
  const query = {};
  query[Order.ORDER_ID] = orderId;
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      orderApi.getOrders(query)
        .then(orders => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(setManagedOrder(orders && orders.docs[0] || {}));
          resolve(orders);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function loadOrders(query) {
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      orderApi.getOrders(Object.assign(query || {}, { page_sort: '-createdOn' }))
        .then(orders => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(loadOrderSuccess(orders));
          resolve(orders);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function createOrder(order) {
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      orderApi.createOrder(order)
        .then(response => {
          dispatch(ajaxActions.ajaxCallSuccess());
          addOrder(response);
          resolve(response);
        })
        .catch(error => {
          const validationError = GetValidationError(error);
          if (validationError.isErrorField) {
            dispatch(invalidManagedOrder(validationError.field, validationError.message));
          } else {
            dispatch(ajaxActions.ajaxCallError());
          }
          reject(error);
        });
    });
  };
}
export function updateOrder(orderId, order) {
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      orderApi.updateOrder(orderId, order)
        .then(response => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(updateOrderList(orderId, response));
          resolve(response);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function deleteOrder(orderId) {
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      orderApi.deleteOrder(orderId)
        .then(response => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(removeOrder(orderId));
          resolve(response);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function loadOrderSuccess(orders) {
  return {
    meta: {
      debounce: 'search'
    },
    type: types.LOAD_ORDERS,
    orders
  };
}
export function addOrder(order) {
  return {
    type: types.ADD_ORDER,
    order
  };
}
export function removeOrder(orderId) {
  return {
    type: types.REMOVE_ORDER,
    orderId
  };
}
export function updateOrderList(orderId, order) {
  return {
    type: types.UPDATE_ORDER,
    orderId,
    order
  };
}
export function setManagedOrder(order) {
  return {
    type: types.SET_MANAGED_ORDER,
    order
  };
}

export function cancelManagedOrder() {
  return {
    type: types.CANCEL_MANAGED_ORDER
  };
}

export function setManagedOrderField(field, value) {
  return {
    meta: { debounce: 'mutation' },
    type: types.SET_MANAGED_ORDER_FIELD,
    field,
    value
  };
}

export function invalidManagedOrder(field, message) {
  return {
    type: types.INVALID_MANAGED_ORDER,
    field,
    message
  };
}

