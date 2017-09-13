import '../../images/customer-header.jpg';

import { FontAwesome, PageBody, PageHeader, Pagination, ResponsiveButton } from '../common/';
import { LABEL_ADD, LABEL_CANCEL, LABEL_CUSTOMERS, LABEL_EDIT, LABEL_REMOVE, LABEL_SAVE } from '../../labels/';

import { Customer } from '../../api/customer/';
import PropTypes from 'prop-types';
import React from 'react';

export const CustomersPageIndex = ({ ajaxGlobal, onSubmit, onInputChange,
  customers, onPaginate, onFormEdit, onSetManagedCustomer, cancelEdit, onFormDelete }) => {
  return (<div className="page customers">
    <PageHeader spinIcon={false} loading={ajaxGlobal.started} label={LABEL_CUSTOMERS} iconName="users" />
    <PageBody>
      {customers.managedCustomer[Customer.CUSTOMER_ID] && <form name="customerForm" onChange={onSetManagedCustomer} onSubmit={onSubmit}>
        <div className="input-group">
          <div className="input-group-btn">
            <ResponsiveButton
              type="submit"
              label={LABEL_SAVE}
              className="btn btn-primary"
              icon={<FontAwesome name="floppy-o" fixedWidth={true} size="lg" />} />
            <ResponsiveButton
              onClick={cancelEdit}
              label={LABEL_CANCEL}
              className="btn btn-danger"
              icon={<FontAwesome name="close" fixedWidth={true} size="lg" />} />
          </div>
          <input name="managedCustomerName" className="form-control" value={customers.managedCustomer[Customer.OUTPUT_NAME]} />
        </div>
      </form>}
      {!customers.managedCustomer[Customer.CUSTOMER_ID] && <form name="customerForm" onChange={onInputChange} onSubmit={onSubmit}>
        <div className="input-group">
          <div className="input-group-btn">
            <ResponsiveButton
              type="submit"
              label={LABEL_ADD}
              className="btn btn-success"
              icon={<FontAwesome name="plus" fixedWidth={true} size="lg" />} />
          </div>
          <input name="customerName" className="form-control" />
        </div>
      </form>}
      <div className="list-group">
        <div className="list-group-item">
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={customers.pages}
            activePage={customers.page}
            maxButtons={5}
            onSelect={onPaginate} /></div>
        {customers.docs && customers.docs.map((customer, index) => (
          <div className={customer[Customer.CUSTOMER_ID] === customers.managedCustomer[Customer.CUSTOMER_ID] ?
            'list-group-item active' : 'list-group-item'} key={customer[Customer.CUSTOMER_ID]}>
            <div className="clearfix">
              <p className="col-xs-8 col-sm-10">{index + 1}.&nbsp;&nbsp;{customer[Customer.OUTPUT_NAME]}</p>
              <div className="col-xs-4 col-sm-2 btn-group btn-group-xs">
                <ResponsiveButton onClick={() => {
                  onFormDelete(customer);
                }} disabled={!!customers.managedCustomer[Customer.CUSTOMER_ID]}
                  className="btn btn-danger pull-right" label={LABEL_REMOVE} icon={
                    <FontAwesome name="trash" size="lg" fixedWidth={true} />
                  } />
                <ResponsiveButton disabled={!!customers.managedCustomer[Customer.CUSTOMER_ID]} onClick={() => {
                  onFormEdit(customer[Customer.CUSTOMER_ID]);
                }} className="btn btn-primary pull-right" label={LABEL_EDIT} icon={
                  <FontAwesome name="pencil" size="lg" fixedWidth={true} />
                } />
              </div>
            </div>
          </div>))}
      </div>
    </PageBody>
  </div>);
};

CustomersPageIndex.propTypes = {
  onFormDelete: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  onFormEdit: PropTypes.func.isRequired,
  customers: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  ajaxGlobal: PropTypes.object.isRequired,
  onPaginate: PropTypes.func.isRequired,
  onSetManagedCustomer: PropTypes.func.isRequired
};
