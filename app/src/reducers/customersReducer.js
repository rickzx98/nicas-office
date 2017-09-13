import { ADD_CUSTOMER, CANCEL_MANAGED_CUSTOMER, LOAD_CUSTOMERS, LOAD_CUSTOMERS_FOR_DROPDOWN, REMOVE_CUSTOMER, SET_MANAGED_CUSTOMER, UPDATE_CUSTOMER } from '../actions/';

import { Customer } from '../api/customer/';
import initialState from './initialState';

export default function customersReducer(state = initialState.customers, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS_FOR_DROPDOWN: {
      return Object.assign({}, { ...state, searchedCustomers: action.customers ? action.customers : [] });
    }
    case SET_MANAGED_CUSTOMER: {
      return Object.assign({}, { ...state, managedCustomer: action.customer });
    }
    case CANCEL_MANAGED_CUSTOMER: {
      return Object.assign({}, { ...state, managedCustomer: {} });
    }
    case LOAD_CUSTOMERS:
      return Object.assign({}, { ...state, ...action.customers });
    case ADD_CUSTOMER: {
      const customers = [...state.docs];
      customers.push(action.customer);
      return Object.assign({}, { ...state, docs: customers });
    }
    case REMOVE_CUSTOMER: {
      const customers = [...state.docs];
      customers.forEach((customer, index) => {
        if (customer[Customer.CUSTOMER_ID] === customer.customerId) {
          customers.splice(index, 1);
        }
      });
      return Object.assign({}, { ...state, docs: customers });
    }
    case UPDATE_CUSTOMER: {
      const customers = [...state.docs];
      customers.forEach((customer, index) => {
        if (customer[Customer.CUSTOMER_ID] === customer.customerId) {
          customers[index] = action.customer;
        }
      });
      return Object.assign({}, { ...state, docs: customers });
    }
    default:
      return state;
  }
}
