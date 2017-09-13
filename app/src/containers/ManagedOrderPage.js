import * as actions from '../actions/OrderActions';
import * as alertActions from '../actions/NotificationActions';
import * as customerActions from '../actions/CustomerActions';
import * as dialogActions from '../actions/DialogActions';

import { CancelModalBody, CancelModalFooter } from '../components/common/';

import { Order } from '../api/order/';
import { OrderManagedPageIndex } from '../components/orders/';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export class ManagedOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.onCancel = this.cancelOrder.bind(this);
    this.modalConfirmCancel = this.confirmCancel.bind(this);
    this.onFormChange = this.onChange.bind(this);
    this.onFormSearchCustomer = this.onSearchCustomer.bind(this);
    this.onFormSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.orderId) {
      this.props.actions.getOrderById(this.props.orderId);
    }
  }

  confirmCancel() {
    this.props.actions.cancelManagedOrder();
    this.props.dialogActions.closeDialog();
  }

  cancelOrder() {
    return new Promise((resolve, reject) => {
      if (this.props.managedOrder.active && this.props.managedOrder.touched) {
        this.props.dialogActions.openDialog({
          body: <CancelModalBody />,
          footer: <CancelModalFooter
            reject={reject}
            resolve={resolve}
            confirmCancel={this.modalConfirmCancel}
            closeDialog={this.props.dialogActions.closeDialog} />
        });
      } else {
        this.props.actions.cancelManagedOrder();
        resolve();
      }
    });
  }
  onChange(event) {
    this.props.actions.setManagedOrderField(event.target.name, event.target.value);
  }
  onSearchCustomer(query) {
    this.props.customerActions.searchCustomerForDropdown(query);
  }
  onSubmit(event) {
    event.preventDefault();
    let promise;
    const order = Object.assign({}, { ...this.props.managedOrder });
    order[Order.CREATED_BY] = this.props.user.username;
    delete order.update;
    delete order.touched;
    delete order.active;
    delete order.invalid;
    delete order.invalidMessage;
    order[Order.CUSTOMER_NAME] = this.props.managedOrder[Order.CUSTOMER_NAME][0];
    if (this.props.isNew) {
      promise = this.props.actions.createOrder(order);
    } else {
      promise = this.props.actions.updateOrder(this.props.orderId, order);
    }
    promise.then(() => {
      if (
        this.props.isNew) {
        this.props.alertActions.alertSuccess('Order has been created.');
      } else {
        this.props.alertActions.alertSuccess('Order has been updated.');
      }
      this.props.actions.cancelManagedOrder();
      browserHistory.push('/orders');
    });
  }
  render() {
    return (<OrderManagedPageIndex
      onSubmit={this.onFormSubmit}
      onSearchCustomer={this.onFormSearchCustomer}
      customers={this.props.customers}
      onCancel={this.onCancel}
      onChange={this.onFormChange}
      isNew={this.props.isNew}
      managedOrder={this.props.managedOrder}
      ajaxGlobal={this.props.ajaxGlobal} />);
  }
}
ManagedOrderPage.propTypes = {
  customers: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  ajaxGlobal: PropTypes.object.isRequired,
  managedOrder: PropTypes.object.isRequired,
  isNew: PropTypes.bool,
  orderId: PropTypes.string,
  alertActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dialogActions: PropTypes.object.isRequired,
  customerActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    managedOrder: state.managedOrder,
    ajaxGlobal: state.ajaxGlobal,
    orderId: (ownProps.routeParams && ownProps.routeParams.orderId && ownProps.routeParams.orderId !== 'new')
      ? ownProps.routeParams.orderId : undefined,
    isNew: ownProps.routeParams && ownProps.routeParams.orderId === 'new',
    customers: state.customers.searchedCustomers
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    alertActions: bindActionCreators(alertActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch),
    customerActions: bindActionCreators(customerActions, dispatch)
  };
}
export const ConnectedManagedOrderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagedOrderPage);
