import { Order } from '../api/order/';
export default {
  ajaxGlobal: { started: false, done: false },
  customers: { data: {}, queue: [], searchedCustomers: [], managedCustomer: {} },
  orders: { data: {}, queue: [], managedOrders: {} },
  home: {
    orders: {},
    dateField: 'createdOn',
    from: undefined,
    to: undefined,
    searchInput: undefined,
    searchField: Order.ORDER_NO
  },
  managedOrder: {
    update: false,
    touched: false,
    active: false,
    invalid: false,
    invalidMessage: '',
    invalidField: undefined
  },
  notifications: [],
  dialog: {
    showCloseButton: true,
    title: 'Hello!',
    body: 'body here...',
    footer: 'footer here...',
    show: false,
    onEnter: () => {
    },
    onEntered: () => {
    },
    onEntering: () => {
    },
    onExit: () => {
    },
    onExited: () => {
    },
    onExiting: () => {
    },
    onHide: () => {
    }
  },
  user: {
    username: 'rickzx98',
    permission: 'ADMIN',
    fullname: 'Jerico de Guzman'
  }
};
