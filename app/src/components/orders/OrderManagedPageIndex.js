import {
  BackButton,
  DatePicker,
  FontAwesome,
  FormGroup,
  PageBody,
  PageHeader,
  ResponsiveButton,
  SearchSelector,
  Selector,
  TextArea,
  TextInput,
  TimePicker
} from '../common/';
import {
  LABEL_AMOUNT,
  LABEL_BACK,
  LABEL_CANCEL_DATE,
  LABEL_CATEGORY,
  LABEL_COMMENTS,
  LABEL_CUSTOMER,
  LABEL_CUSTOMER_PO_NO,
  LABEL_DATE_CREATED_EBS,
  LABEL_ORDERS,
  LABEL_PO_RECIVED_DATE,
  LABEL_PO_RECIVED_TIME,
  LABEL_RECEIVED_VIA,
  LABEL_REQUEST_DATE,
  LABEL_SALE_ORDER,
  LABEL_SAVE,
  LABEL_SHIP_DATE,
  LABEL_STATUS,
  LABEL_TIME_CREATED_EBS
} from '../../labels/';
import { addSeconds, dateToSeconds } from '../../utils/';
import { getCategoriesForDropdown, getSourceTypesForDropdown, getStatusForDropdown } from '../../selectors/orderSelectors';

import { Order } from '../../api/order/';
import PropTypes from 'prop-types';
import React from 'react';
import { getCustomersForDropdown } from '../../selectors/customerSelectors';

export const OrderManagedPageIndex = ({ ajaxGlobal, onCancel, managedOrder,
  onChange, onSearchCustomer, customers, onSubmit }) => {
  return (<div className="page orders">
    <PageHeader label={LABEL_ORDERS} iconName="briefcase" spinIcon={false} loading={ajaxGlobal.stared} />
    <PageBody>
      <form onSubmit={onSubmit} onChange={onChange} name="orderManagedForm">
        <div className="no-pad-left col-sm-12 form-group">
          <BackButton to="/orders" label={LABEL_BACK} confirm={onCancel} />
          <ResponsiveButton disabled={!managedOrder.touched} type="submit"
            className="btn btn-primary" icon={
              <FontAwesome fixedWidth={true} name="floppy-o" />
            } label={LABEL_SAVE} />
        </div>
        <div className="col-sm-6">
          <TextInput
            invalid={Order.ORDER_NO === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            label={LABEL_SALE_ORDER}
            type="number"
            name={Order.ORDER_NO}
            value={managedOrder[Order.ORDER_NO]} />

          <FormGroup required={(managedOrder[Order.ORDER_NO] && managedOrder[Order.ORDER_NO].length > 0) === true}
            label={LABEL_DATE_CREATED_EBS}
            name={Order.DATE_CREATED_EBS} >
            <DatePicker required={(managedOrder[Order.ORDER_NO] && managedOrder[Order.ORDER_NO].length > 0) === true}
              value={managedOrder[Order.DATE_CREATED_EBS]}
              name={Order.DATE_CREATED_EBS}
              onChange={(value) => {
                onChange({
                  target: {
                    name: Order.DATE_CREATED_EBS,
                    value
                  }
                });
              }} />
          </FormGroup>
          {managedOrder[Order.DATE_CREATED_EBS] &&
            <FormGroup required={true}
              label={LABEL_TIME_CREATED_EBS}
              name={Order.TIME_CREATED_EBS} >
              <TimePicker step={5}
                required={true}
                value={dateToSeconds(managedOrder[Order.DATE_CREATED_EBS])}
                onChange={(time) => {
                  onChange({
                    target: {
                      name: Order.DATE_CREATED_EBS,
                      value: addSeconds(managedOrder[Order.DATE_CREATED_EBS], time)
                    }
                  });
                }} />
            </FormGroup>}


          <TextInput
            invalid={Order.CUSTOMER_PO_NUMBER === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            required={true}
            label={LABEL_CUSTOMER_PO_NO}
            name={Order.CUSTOMER_PO_NUMBER}
            value={managedOrder[Order.CUSTOMER_PO_NUMBER]} />

          <SearchSelector
            invalid={Order.CUSTOMER_NAME === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            required={true}
            allowNew={false}
            multiple={false}
            options={getCustomersForDropdown(customers)}
            onSearch={onSearchCustomer}
            onChange={(name, value) => {
              onChange({
                target: {
                  name, value
                }
              });
            }}
            label={LABEL_CUSTOMER}
            name={Order.CUSTOMER_NAME}
            value={managedOrder[Order.CUSTOMER_NAME]} />

          <FormGroup
            invalid={Order.PO_RECEIVED_DATE === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            required={true}
            label={LABEL_PO_RECIVED_DATE}
            name={Order.PO_RECEIVED_DATE} >
            <DatePicker
              required={true}
              value={managedOrder[Order.PO_RECEIVED_DATE]}
              name={Order.PO_RECEIVED_DATE}
              onChange={(value) => {
                onChange({
                  target: {
                    name: Order.PO_RECEIVED_DATE,
                    value
                  }
                });
              }} />
          </FormGroup>
          {managedOrder[Order.PO_RECEIVED_DATE] &&
            <FormGroup required={true}
              label={LABEL_PO_RECIVED_TIME}
              name={Order.PO_RECEIVED_TIME} >
              <TimePicker step={5}
                required={true}
                value={dateToSeconds(managedOrder[Order.PO_RECEIVED_DATE])}
                onChange={(time) => {
                  onChange({
                    target: {
                      name: Order.PO_RECEIVED_DATE,
                      value: addSeconds(managedOrder[Order.PO_RECEIVED_DATE], time)
                    }
                  });
                }} />
            </FormGroup>}
          <Selector
            required={true}
            value={managedOrder[Order.SOURCE_TYPE]}
            options={getSourceTypesForDropdown()}
            label={LABEL_RECEIVED_VIA}
            name={Order.SOURCE_TYPE} />
        </div>
        <div className="col-sm-6">
          <FormGroup
            invalid={Order.REQUEST_DATE === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            required={true}
            label={LABEL_REQUEST_DATE}
            name={Order.REQUEST_DATE} >
            <DatePicker
              required={true}
              value={managedOrder[Order.REQUEST_DATE]}
              name={Order.REQUEST_DATE}
              onChange={(value) => {
                onChange({
                  target: {
                    name: Order.REQUEST_DATE,
                    value
                  }
                });
              }} />
          </FormGroup>
          <FormGroup
            invalid={Order.SHIP_DATE === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            label={LABEL_SHIP_DATE}
            name={Order.SHIP_DATE} >
            <DatePicker
              value={managedOrder[Order.SHIP_DATE]}
              name={Order.SHIP_DATE}
              onChange={(value) => {
                onChange({
                  target: {
                    name: Order.SHIP_DATE,
                    value
                  }
                });
              }} />
          </FormGroup>
          <FormGroup
            invalid={Order.CANCEL_DATE === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            label={LABEL_CANCEL_DATE}
            name={Order.CANCEL_DATE} >
            <DatePicker
              value={managedOrder[Order.CANCEL_DATE]}
              name={Order.CANCEL_DATE}
              onChange={(value) => {
                onChange({
                  target: {
                    name: Order.CANCEL_DATE,
                    value
                  }
                });
              }} />
          </FormGroup>
          <TextArea
            invalid={Order.COMMENTS === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            label={LABEL_COMMENTS}
            name={Order.COMMENTS}
            value={managedOrder[Order.COMMENTS]} />
          <TextInput required={true}
            invalid={Order.AMOUNT === managedOrder.invalidField}
            message={managedOrder.invalidMessage}
            label={LABEL_AMOUNT}
            name={Order.AMOUNT}
            value={managedOrder[Order.AMOUNT]} />

          <Selector required={true} value={managedOrder[Order.STATUS]} options={getStatusForDropdown()} label={LABEL_STATUS} name={Order.STATUS} />
          <Selector required={true} value={managedOrder[Order.CATEGORY]} options={getCategoriesForDropdown()} label={LABEL_CATEGORY} name={Order.CATEGORY} />
        </div>
      </form>
    </PageBody>
  </div>);
};

OrderManagedPageIndex.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  customers: PropTypes.object,
  onSearchCustomer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  ajaxGlobal: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  managedOrder: PropTypes.object.isRequired
};
