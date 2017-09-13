import * as ajaxActions from './AjaxStatusActions';
import * as types from './';

import { Customer, Api as customerApi } from '../api/customer/';

export function searchCustomerForDropdown(name) {
  if (name) {
    name = name.toLowerCase();
  }
  const query = { name };
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      customerApi.getCustomers(Object.assign(query || {}, { page_sort: '-createdOn' }))
        .then(customers => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(loadCustomerForDropdown(customers));
          resolve(customers);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function getCustomerById(customerId) {
  const query = {};
  query[Customer.CUSTOMER_ID] = customerId;
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      customerApi.getCustomers(query)
        .then(customers => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(setManagedCustomer(customers && customers.docs[0] || {}));
          resolve(customers);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function loadCustomers(query) {
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      customerApi.getCustomers(Object.assign(query || {}, { page_sort: '-createdOn' }))
        .then(customers => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(loadCustomerSuccess(customers));
          resolve(customers);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function createCustomer(customer) {
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      customerApi.createCustomer(customer)
        .then(response => {
          dispatch(ajaxActions.ajaxCallSuccess());
          addCustomer(response);
          resolve(response);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function updateCustomer(customerId, customer) {
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      customerApi.updateCustomer(customerId, customer)
        .then(response => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(updateCustomerList(customerId, response));
          resolve(response);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function deleteCustomer(customerId) {
  return dispatch => {
    dispatch(ajaxActions.beginAjaxCall());
    return new Promise((resolve, reject) => {
      customerApi.deleteCustomer(customerId)
        .then(response => {
          dispatch(ajaxActions.ajaxCallSuccess());
          dispatch(removeCustomer(customerId));
          resolve(response);
        })
        .catch(error => {
          dispatch(ajaxActions.ajaxCallError());
          reject(error);
        });
    });
  };
}
export function loadCustomerSuccess(customers) {
  return {
    meta: {
      debounce: 'search'
    },
    type: types.LOAD_CUSTOMERS,
    customers
  };
}
export function addCustomer(customer) {
  return {
    type: types.ADD_CUSTOMER,
    customer
  };
}
export function removeCustomer(customerId) {
  return {
    type: types.REMOVE_CUSTOMER,
    customerId
  };
}
export function updateCustomerList(customerId, customer) {
  return {
    type: types.UPDATE_CUSTOMER,
    customerId,
    customer
  };
}
export function setManagedCustomer(customer) {
  return {
    type: types.SET_MANAGED_CUSTOMER,
    customer
  };
}

export function cancelManagedCustomer() {
  return {
    type: types.CANCEL_MANAGED_CUSTOMER
  };
}

export function loadCustomerForDropdown(customers) {
  return {
    meta: {
      debounce: 'search'
    },
    type: types.LOAD_CUSTOMERS_FOR_DROPDOWN,
    customers
  };
}
