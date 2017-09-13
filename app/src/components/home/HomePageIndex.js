import {
  CollapseHeader,
  DatePicker,
  FontAwesome,
  Page,
  PageBody,
  PageHeader,
  Pagination,
  ResponsiveButton,
  Selector
} from '../common/';
import {
  LABEL_ADD_NEW,
  LABEL_AMOUNT,
  LABEL_CANCEL_DATE,
  LABEL_CATEGORY,
  LABEL_COMMENTS,
  LABEL_CREATED_BY,
  LABEL_CREATED_ON,
  LABEL_CSV,
  LABEL_CUSTOMER,
  LABEL_CUSTOMER_PO_NO,
  LABEL_DATE_CREATED_EBS,
  LABEL_DATE_FIELD,
  LABEL_DATE_FROM,
  LABEL_DATE_TO,
  LABEL_EDIT,
  LABEL_ORDERS,
  LABEL_PO_RECIVED_DATE,
  LABEL_PO_RECIVED_TIME,
  LABEL_RECEIVED_VIA,
  LABEL_REFRESH,
  LABEL_REMOVE,
  LABEL_REQUEST_DATE,
  LABEL_SALE_ORDER,
  LABEL_SEARCH,
  LABEL_SHIP_DATE,
  LABEL_STATUS,
  LABEL_TIME_CREATED_EBS,
  LABEL_WELCOME_TO
} from '../../labels/';
import { dateFieldsForDropdown, searchFieldsForDropdown } from '../../selectors/orderSelectors';
import { isAdmin, toReadableDate, toReadableDatestamp } from '../../utils/';

import { Home } from '../../api/home/';
import { Order } from '../../api/order/';
import PropTypes from 'prop-types';
import React from 'react';

export const HomePageIndex = ({ ajaxGlobal, onChange, home, onSubmit, onPaginate, downloadAsCsv }) => {

  return (<Page className="home">
    <PageHeader label={LABEL_WELCOME_TO} loading={ajaxGlobal.started} iconName="home" spinIcon={false} />
    <PageBody>
      <CollapseHeader panelStyle="panel-warning" heading={<h4>{LABEL_SEARCH}</h4>}>
        <form onSubmit={onSubmit} onChange={onChange} name="homeSearch" className="container-fluid">
          <div className="clearfix">
            <div className="col-sm-4">
              <label>{LABEL_DATE_FIELD}</label>
              <Selector
                value={home[Home.DATE_FIELD]}
                onChange={(field, value) => {
                  onChange({
                    target: {
                      name: field,
                      value
                    }
                  });
                }} options={dateFieldsForDropdown()} name={Home.DATE_FIELD} />
            </div>
            <div className="col-sm-4">
              <label>{LABEL_DATE_FROM}</label>
              <DatePicker disabled={!home[Home.DATE_FIELD]} value={home[Home.DATE_FROM]} name={Home.DATE_FROM} onChange={(value) => {
                onChange({
                  target: {
                    name: Home.DATE_FROM,
                    value
                  }
                });
              }} />
            </div>
            <div className="col-sm-4">
              <label>{LABEL_DATE_TO}</label>
              <DatePicker disabled={!home[Home.DATE_FIELD]} value={home[Home.DATE_TO]} name={Home.DATE_TO} onChange={(value) => {
                onChange({
                  target: {
                    name: Home.DATE_TO,
                    value
                  }
                });
              }} />
            </div>
          </div>
          <div className="clearfix">
            <div className="col-sm-2">
              <Selector
                value={home[Home.SEARCH_FIELD]}
                onChange={(field, value) => {
                  onChange({
                    target: {
                      name: field,
                      value
                    }
                  });
                }}
                options={searchFieldsForDropdown()}
                name={Home.SEARCH_FIELD} />
            </div>
            <div className="col-sm-10">
              <div className="input-group">
                <input className="form-control" name={Home.SEARCH_INPUT} placeholder={LABEL_SEARCH} />
                <div className="input-group-btn">
                  <ResponsiveButton
                    type="submit"
                    label={LABEL_SEARCH}
                    className="btn btn-warning" icon={
                      <FontAwesome name="search"
                        size="lg"
                        fixedWidth={true} />} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CollapseHeader>
      {home.orders && home.orders.docs && (<div className="clearfix">
        <Pagination className="pull-left"
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={home.orders.pages}
          activePage={home.orders.page}
          maxButtons={9}
          onSelect={onPaginate} />
        <ResponsiveButton label={LABEL_CSV} onClick={downloadAsCsv} className="button-tool btn btn-primary" icon={<FontAwesome fixedWidth={true} size="lg" name="file-excel-o" />} />
      </div>
      )}
      <div className="table-repsonsive">
        {home.orders && home.orders.docs && home.orders.docs.map(order => (
          <CollapseHeader panelStyle="panel-primary" key={order[Order.ORDER_ID]} collapsed={true} heading={<h5>{order[Order.CUSTOMER_PO_NUMBER] + '-' + order[Order.CUSTOMER_NAME] + ' - ' + toReadableDatestamp(order[Order.PO_RECEIVED_DATE])}</h5>}>
            <div className="container-fluid">
              <ul className="col-sm-6">
                <li>
                  <b>{LABEL_SALE_ORDER}:</b>&nbsp; <span className="underline">{order[Order.ORDER_NO]}</span>
                </li>
                <li>
                  <b> {LABEL_DATE_CREATED_EBS}:</b>&nbsp; <span className="underline"> {toReadableDatestamp(order[Order.DATE_CREATED_EBS])} </ span>
                </li>
                <li>
                  <b> {LABEL_CUSTOMER_PO_NO}:</b>&nbsp; <span className="underline"> {order[Order.CUSTOMER_PO_NUMBER]}</span>
                </li>
                <li>
                  <b> {LABEL_CUSTOMER}:</b>&nbsp;  <span className="underline"> {order[Order.CUSTOMER_NAME]} </span>
                </li>
                <li>
                  <b> {LABEL_PO_RECIVED_DATE}:</b>&nbsp;  <span className="underline"> {toReadableDatestamp(order[Order.PO_RECEIVED_DATE])} </span>
                </li>
                <li>
                  <b> {LABEL_RECEIVED_VIA}:</b>&nbsp; <span className="underline"> {order[Order.SOURCE_TYPE]} </span>
                </li>
              </ul>
              <ul className="col-sm-6">
                <li>
                  <b> {LABEL_REQUEST_DATE}:</b>&nbsp;  <span className="underline"> {toReadableDate(order[Order.REQUEST_DATE])} </span>
                </li>
                <li>
                  <b> {LABEL_SHIP_DATE}:</b>&nbsp;  <span className="underline"> {toReadableDate(order[Order.SHIP_DATE])} </span>
                </li>
                <li>
                  <b> {LABEL_CANCEL_DATE}:</b>&nbsp;  <span className="underline"> {toReadableDate(order[Order.CANCEL_DATE])} </span>
                </li>
                <li>
                  <b> {LABEL_AMOUNT}:</b>&nbsp;  <span className="underline"> {order[Order.AMOUNT]} </span>
                </li>
                <li>
                  <b> {LABEL_STATUS}:</b>&nbsp;  <span className="underline"> {order[Order.STATUS]} </span>
                </li>
                <li>
                  <b> {LABEL_CATEGORY}:</b>&nbsp;  <span className="underline"> {order[Order.CATEGORY]} </span>
                </li>
              </ul>
              <div className="col-sm-12">
                <div><b> {LABEL_CREATED_ON}:</b>&nbsp;  <span className="underline"> {toReadableDate(order[Order.CREATED_ON])} </span></div>
                <div><b> {LABEL_CREATED_BY}:</b>&nbsp;  <span className="underline"> {order[Order.CREATED_BY]} </span></div>
                <div><b> {LABEL_COMMENTS}:</b>&nbsp;  <p> {order[Order.COMMENTS]} </p></div>
              </div>
            </div>
          </CollapseHeader>
        ))}
      </div>
    </PageBody>
  </Page >);
};

HomePageIndex.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  ajaxGlobal: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired,
  onPaginate: PropTypes.func.isRequired,
  downloadAsCsv: PropTypes.func.isRequired
};
