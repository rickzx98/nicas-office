import * as ajaxActions from './AjaxStatusActions';
import * as types from './';

import { Api as orderApi } from '../api/order/';

export function setHomeSearchField(field, value) {
  return {
    type: types.SET_HOME_SEARCH_FIELD,
    field,
    value
  };
}
export function setHomeOrders(orders) {
  return {
    type: types.SET_HOME_ORDERS,
    orders
  };
}
export function loadOrders(query) {
  return (dispatch, getState) => {
    const state = getState().home;
    query = !query ? {} : query;
    if (state.to && state.from) {
      query.dateField = state.dateField;
    }
    if (state.to) {
      query.to = state.to;
    }
    if (state.from) {
      query.from = state.from;
    }
    if (state.searchInput) {
      query[state.searchField] = state.searchInput;
    }
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      orderApi.getOrders(Object.assign(query || {}, { page_sort: '-createdOn' }))
        .then(orders => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(setHomeOrders(orders));
          resolve(orders);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function downloadAsCSV(query) {
  return (dispatch, getState) => {
    const state = getState().home;
    query = !query ? {} : query;
    if (state.to && state.from) {
      query.dateField = state.dateField;
    }
    if (state.to) {
      query.to = state.to;
    }
    if (state.from) {
      query.from = state.from;
    }
    if (state.searchInput) {
      query[state.searchField] = state.searchInput;
    }
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      orderApi.getOrdersAsCSV(Object.assign(query || {}, { page_sort: '-createdOn' }));
    });
  };
}
