import 'whatwg-fetch';

import { toQueryParam } from '../../utils/';

const ORDER_API = process.env.ORDER_API;
const HOST_API = process.env.HOST_API;

export class Api {
  static getOrdersAsCSV(query) {
    return new Promise((resolve, reject) => {
      const downloadWindow = window.open(`${HOST_API}${ORDER_API}/csv/${toQueryParam(query)}`, '', 'menubar=no,location=no,status=no');
    });
  }
  static getOrders(query) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_API}${ORDER_API}${toQueryParam(query)}`)
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

  static createOrder(order) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_API}${ORDER_API}`, {
        headers: {
          'Content-Type': 'application/json'
        }, method: 'POST',
        body: JSON.stringify(order)
      }).then(response => {
        response.json()
          .then(result => {
            if (result.type.indexOf('ERROR_') > -1) {
              reject(new Error(result.data));
            } else {
              resolve(result.data);
            }
          })
          .catch(error => {
            reject(error);
          });
      }).catch(error => {
        reject(error);
      });
    });
  }

  static deleteOrder(orderId) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_API}${ORDER_API}/${orderId}`, { method: 'DELETE' }).then(response => {
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

  static updateOrder(orderId, order) {
    return new Promise((resolve, reject) => {
      fetch(`${HOST_API}${ORDER_API}/${orderId}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(order)
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
