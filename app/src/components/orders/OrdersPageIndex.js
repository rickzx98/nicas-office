import { FontAwesome, Page, PageBody, PageHeader, Pagination, ResponsiveButton } from '../common/';
import {
  LABEL_ADD_NEW,
  LABEL_AMOUNT,
  LABEL_CANCEL_DATE,
  LABEL_CATEGORY,
  LABEL_COMMENTS,
  LABEL_CREATED_BY,
  LABEL_CREATED_ON,
  LABEL_CUSTOMER,
  LABEL_CUSTOMER_PO_NO,
  LABEL_DATE_CREATED_EBS,
  LABEL_EDIT,
  LABEL_ORDERS,
  LABEL_PO_RECIVED_DATE,
  LABEL_PO_RECIVED_TIME,
  LABEL_RECEIVED_VIA,
  LABEL_REFRESH,
  LABEL_REMOVE,
  LABEL_REQUEST_DATE,
  LABEL_SALE_ORDER,
  LABEL_SHIP_DATE,
  LABEL_STATUS,
  LABEL_TIME_CREATED_EBS
} from '../../labels/';
import { isAdmin, toReadableDate, toReadableDatestamp, toReadableTime } from '../../utils/';

import { Order } from '../../api/order/';
import PropTypes from 'prop-types';
import React from 'react';

export const OrdersPageIndex = ({ user, ajaxGlobal, orders, onPaginate, addNew, refresh, edit, onDelete }) => {
  return (<Page className="orders">
    <PageHeader
      iconName="briefcase"
      label={LABEL_ORDERS}
      spinIcon={false}
      loading={ajaxGlobal.started} />
    <PageBody>
      <div className="btn btn-group">
        <ResponsiveButton onClick={addNew} className="btn btn-success btn-sm" label={LABEL_ADD_NEW} icon={
          <FontAwesome name="plus" size="lg" fixedWidth={true} />
        } />
        <ResponsiveButton onClick={refresh} className="btn btn-success btn-sm" label={LABEL_REFRESH} icon={
          <FontAwesome spin={ajaxGlobal.started} name="refresh" size="lg" fixedWidth={true} />
        } />
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-stripped table-condensed">
          <thead>
            <tr>
              <th colSpan={18}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  items={orders.pages}
                  activePage={orders.page}
                  maxButtons={9}
                  onSelect={onPaginate} />
              </th>
            </tr>
            <tr className="bg-primary">
              {isAdmin(user) && <th />}
              <th>{LABEL_SALE_ORDER}</th>
              <th>{LABEL_DATE_CREATED_EBS}</th>
              <th>{LABEL_TIME_CREATED_EBS}</th>
              <th>{LABEL_CUSTOMER_PO_NO}</th>
              <th>{LABEL_CUSTOMER}</th>
              <th>{LABEL_PO_RECIVED_DATE}</th>
              <th>{LABEL_PO_RECIVED_TIME}</th>
              <th>{LABEL_RECEIVED_VIA}</th>
              <th>{LABEL_REQUEST_DATE}</th>
              <th>{LABEL_SHIP_DATE}</th>
              <th>{LABEL_CANCEL_DATE}</th>
              <th>{LABEL_AMOUNT}</th>
              <th>{LABEL_COMMENTS}</th>
              <th>{LABEL_STATUS}</th>
              <th>{LABEL_CATEGORY}</th>
              <th>{LABEL_CREATED_BY}</th>
              <th>{LABEL_CREATED_ON}</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.docs && orders.docs.map(order => (
              <tr key={order[Order.ORDER_ID]}>
                {isAdmin(user) && (
                  <td>
                    <ResponsiveButton onClick={() => {
                      edit(order[Order.ORDER_ID]);
                    }} label={LABEL_EDIT}
                      className="btn btn-primary btn-xs" icon={
                        <FontAwesome name="pencil" fixedWidth={true} size="lg" />
                      } />
                    <ResponsiveButton onClick={() => {
                      onDelete(order);
                    }}
                      label={LABEL_REMOVE}
                      className="btn btn-danger btn-xs" icon={
                        <FontAwesome name="trash" fixedWidth={true} size="lg" />
                      } />
                  </td>)}
                <td>{order[Order.ORDER_NO]}</td>
                <td>{toReadableDate(order[Order.DATE_CREATED_EBS])}</td>
                <td>{toReadableTime(order[Order.DATE_CREATED_EBS])}</td>
                <td>{order[Order.CUSTOMER_PO_NUMBER]}</td>
                <td>{order[Order.CUSTOMER_NAME]}</td>
                <td>{toReadableDate(order[Order.PO_RECEIVED_DATE])}</td>
                <td>{toReadableTime(order[Order.PO_RECEIVED_DATE])}</td>
                <td>{order[Order.SOURCE_TYPE]}</td>
                <td>{toReadableDate(order[Order.REQUEST_DATE])}</td>
                <td>{toReadableDate(order[Order.SHIP_DATE])}</td>
                <td>{toReadableDate(order[Order.CANCEL_DATE])}</td>
                <td>{order[Order.AMOUNT]}</td>
                <td><p>{order[Order.COMMENTS]}</p></td>
                <td>{order[Order.STATUS]}</td>
                <td>{order[Order.CATEGORY]}</td>
                <td>{order[Order.CREATED_BY]}</td>
                <td>{toReadableDatestamp(order[Order.CREATED_ON])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageBody>
  </Page >);
};
OrdersPageIndex.propTypes = {
  onDelete: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  ajaxGlobal: PropTypes.object.isRequired,
  onPaginate: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
};
