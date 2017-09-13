import * as actions from '../actions/OrderActions';
import * as alertActions from '../actions/NotificationActions';
import * as dialogActions from '../actions/DialogActions';

import { CancelModalFooter, DeleteModalBody } from '../components/common/';

import { Order } from '../api/order/';
import { OrdersPageIndex } from '../components/orders/';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getPage } from '../utils/';

export class OrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.thisAddNew = this.addNew.bind(this);
    this.thisPaginate = this.paginate.bind(this);
    this.thisRefresh = this.refresh.bind(this);
    this.thisEdit = this.edit.bind(this);
    this.thisConfirmDelete = this.confirmDelete.bind(this);
    this.thisOnDelete = this.onDelete.bind(this);
  }
  componentWillMount() {
    this.props.actions.loadOrders();
  }
  addNew() {
    browserHistory.push('/orders/new');
  }
  paginate(page_current) {
    this.props.actions.loadOrders({ page_current, page_offset: getPage(this.props.orders.limit, page_current) });
  }
  refresh() {
    this.props.actions.loadOrders();
  }
  edit(id) {
    browserHistory.push(`/orders/${id}`);
  }
  confirmDelete(orderId) {
    return this.props.actions.deleteOrder(orderId).then(() => {
      this.props.dialogActions.closeDialog();
    });
  }
  onDelete(order) {
    return new Promise((resolve, reject) => {
      this.props.dialogActions.openDialog({
        title: 'Delete order',
        body: <DeleteModalBody itemName={order[Order.CUSTOMER_PO_NUMBER]} />,
        footer: (<CancelModalFooter
          closeDialog={this.props.dialogActions.closeDialog}
          confirmCancel={() => {
            this.thisConfirmDelete(order[Order.ORDER_ID])
              .then(() => {
                this.props.actions.loadOrders().
                  then(() => {
                    this.props.alertActions.alertSuccess(`${order[Order.CUSTOMER_PO_NUMBER]} has beed removed.`);
                    resolve();
                  });
              })
              .catch(error => { reject(error); });
          }}
          resolve={resolve} reject={reject} />)
      });
    });
  }
  render() {
    return (<OrdersPageIndex
      onDelete={this.thisOnDelete}
      edit={this.thisEdit}
      user={this.props.user}
      refresh={this.thisRefresh}
      addNew={this.thisAddNew}
      onPaginate={this.thisPaginate}
      ajaxGlobal={this.props.ajaxGlobal}
      orders={this.props.orders} />);
  }
}

OrdersPage.propTypes = {
  customers: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  ajaxGlobal: PropTypes.object.isRequired,
  alertActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dialogActions: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    managedOrder: state.managedOrder,
    ajaxGlobal: state.ajaxGlobal,
    orders: state.orders
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    alertActions: bindActionCreators(alertActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}
export const ConnectedOrdersPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersPage);
