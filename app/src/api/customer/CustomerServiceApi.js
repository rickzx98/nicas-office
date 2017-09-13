import 'whatwg-fetch';

import { toQueryParam } from '../../utils/';

const CUSTOMER_API = process.env.CUSTOMER_API;
const HOST_API = process.env.HOST_API;

export class Api {
  static getCustomers(query) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_API}${CUSTOMER_API}${toQueryParam(query)}`)
        .then(response => {
          response.json()
            .then(result => {
              resolve(result.data);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static createCustomer(customer) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_API}${CUSTOMER_API}`, {
        headers: {
          'Content-Type': 'application/json'
        }, method: 'POST',
        body: JSON.stringify(customer)
      }).then(response => {
        response.json()
          .then(result => {
            resolve(result.data);
          })
          .catch(error => {
            reject(error);
          });
      }).catch(error => {
        reject(error);
      });
    });
  }

  static deleteCustomer(customerId) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_API}${CUSTOMER_API}/${customerId}`, { method: 'DELETE' }).then(response => {
        response.json()
          .then(result => {
            resolve(result.data);
          })
          .catch(error => {
            reject(error);
          });
      }).catch(error => {
        reject(error);
      });
    });
  }

  static updateCustomer(customerId, customer) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_API}${CUSTOMER_API}/${customerId}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(customer)
      }).then(response => {
        response.json()
          .then(result => {
            resolve(result.data);
          })
          .catch(error => {
            reject(error);
          });
      }).catch(error => {
        reject(error);
      });
    });
  }
}
