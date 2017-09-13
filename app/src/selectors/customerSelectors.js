import { Customer } from '../api/customer/';
export function getCustomersForDropdown(customers) {
  let docs = [];
  if (customers && customers.docs) {
    docs = customers.docs.map(customer => { return { label: customer[Customer.OUTPUT_NAME], value: customer[Customer.OUTPUT_NAME] }; });
  }
  return docs;
}
