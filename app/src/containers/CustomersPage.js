import * as actions from '../actions/CustomerActions';
import * as alertActions from '../actions/NotificationActions';
import * as dialogActions from '../actions/DialogActions';

import { CancelModalFooter, DeleteModalBody } from '../components/common/';

import { Customer } from '../api/customer/Customer';
import { CustomersPageIndex } from '../components/customers/';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getPage } from '../utils/';

export class CustomersPage extends React.Component {
  constructor(props) {
    super(props);
    this.onPaginate = this.paginate.bind(this);
    this.onFormSubmit = this.onSubmit.bind(this);
    this.onFormInputChange = this.onInputChange.bind(this);
    this.onFormEdit = this.onEditCustomer.bind(this);
    this.onSetManagedCustomer = this.setManagedCustomer.bind(this);
    this.cancelEdit = this.onCancelEdit.bind(this);
    this.onFormDelete = this.onDelete.bind(this);
    this.onFormConfirmDelete = this.confirmDelete.bind(this);
    this.state = {};
  }
  componentWillMount() {
    if (this.props.customerId) {
      this.props.actions.getCustomerById(this.props.customerId);
    }
    this.props.actions.loadCustomers();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.customerId !== nextProps.customerId && nextProps.customerId) {
      nextProps.actions.getCustomerById(nextProps.customerId);
    }
  }
  setManagedCustomer(event) {
    this.props.actions.setManagedCustomer(Object.assign({}, { ...this.props.customers.managedCustomer, name: event.target.value }));
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.props.isNew) {
      if (event.target['customerName'].value && event.target['customerName'].value.length > 0) {
        const customer = {
          userId: this.props.user.username,
          customerName: event.target['customerName'].value
        };
        this.props.actions.createCustomer(customer)
          .then(() => {
            document.forms['customerForm']['customerName'].value = '';
            this.props.alertActions.alertSuccess(`${customer.customerName} has beed added.`);
            this.props.actions.loadCustomers();
          });
      } else {
        this.props.alertActions.alertWarning('Can\'t do that. :)');
      }
    } else if (this.props.customerId) {
      this.props.actions.updateCustomer(this.props.customerId, this.props.customers.managedCustomer)
        .then(() => {
          this.props.alertActions.alertSuccess(`${this.props.customers.managedCustomer.name} has beed updated.`);
          document.forms['customerForm']['managedCustomerName'].value = '';
          this.props.actions.loadCustomers();
          this.cancelEdit();
        });
    }
  }
  onInputChange(event) {
    const name = event.target.value && event.target.value.length > 0 ? event.target.value.toLowerCase() : undefined;
    this.props.actions.loadCustomers(name ? { name } : undefined);
  }
  paginate(page_current) {
    this.props.actions.loadCustomers({ page_current, page_offset: getPage(this.props.customers.limit, page_current) });
  }
  onEditCustomer(customerId) {
    browserHistory.push(`/customers/${customerId}`);
  }
  onCancelEdit() {
    this.props.actions.cancelManagedCustomer();
    browserHistory.goBack();
  }
  confirmDelete(customerId) {
    return this.props.actions.deleteCustomer(customerId).then(() => {
      this.props.dialogActions.closeDialog();
    });
  }
  onDelete(customer) {
    return new Promise((resolve, reject) => {
      this.props.dialogActions.openDialog({
        title: 'Delete customer',
        body: <DeleteModalBody itemName={customer[Customer.OUTPUT_NAME]} />,
        footer: (<CancelModalFooter
          closeDialog={this.props.dialogActions.closeDialog}
          confirmCancel={() => {
            this.onFormConfirmDelete(customer[Customer.CUSTOMER_ID])
              .then(() => {
                this.props.actions.loadCustomers().
                  then(() => {
                    this.props.alertActions.alertSuccess(`${customer[Customer.OUTPUT_NAME]} has beed removed.`);
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
    return (<CustomersPageIndex
      onFormDelete={this.onFormDelete}
      cancelEdit={this.cancelEdit}
      onFormEdit={this.onFormEdit}
      onPaginate={this.onPaginate}
      customers={this.props.customers}
      onInputChange={this.onFormInputChange}
      onSubmit={this.onFormSubmit}
      ajaxGlobal={this.props.ajaxGlobal}
      onSetManagedCustomer={this.onSetManagedCustomer} />);
  }
}

CustomersPage.propTypes = {
  actions: PropTypes.object.isRequired,
  ajaxGlobal: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired,
  isNew: PropTypes.bool,
  customerId: PropTypes.string,
  alertActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dialogActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    customers: state.customers,
    ajaxGlobal: state.ajaxGlobal,
    customerId: (ownProps.routeParams && ownProps.routeParams.customerId && ownProps.routeParams.customerId !== 'new')
      ? ownProps.routeParams.customerId : undefined,
    isNew: ownProps.routeParams && !ownProps.routeParams.customerId
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    alertActions: bindActionCreators(alertActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}
export const ConnectedCustomersPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomersPage);

