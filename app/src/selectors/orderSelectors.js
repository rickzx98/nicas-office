import { Categories, Order, OrderStatus, SourceTypes } from '../api/order/';
import {
  LABEL_BRANDWISE_ROAD,
  LABEL_BRANDWISE_SHOW,
  LABEL_CANCEL_DATE,
  LABEL_CLEAN,
  LABEL_CREATED_ON,
  LABEL_CUSTOMER_PO_NO,
  LABEL_DATE_CREATED_EBS,
  LABEL_EMAIL,
  LABEL_EMPTY_OPTION,
  LABEL_EXEMPTED,
  LABEL_PHONE,
  LABEL_PROCESSED,
  LABEL_SALE_ORDER,
  LABEL_SHIP_DATE,
  LABEL_UNPROCESSED,
  LABEL_WEB
} from '../labels/';

export function getStatusForDropdown() {
  return [{
    label: LABEL_EMPTY_OPTION,
    value: ''
  }, {
    label: LABEL_PROCESSED,
    value: OrderStatus.PROCESSED
  }, {
    label: LABEL_UNPROCESSED,
    value: OrderStatus.UNPROCESSED
  }];
}

export function getSourceTypesForDropdown() {
  return [{
    label: LABEL_EMPTY_OPTION,
    value: ''
  }, {
    label: LABEL_EMAIL,
    value: SourceTypes.EMAIL
  }, {
    label: LABEL_WEB,
    value: SourceTypes.WEB
  }, {
    label: LABEL_PHONE,
    value: SourceTypes.PHONE
  }, {
    label: LABEL_BRANDWISE_ROAD,
    value: SourceTypes.BRANDWISE_ROAD
  }, {
    label: LABEL_BRANDWISE_SHOW,
    value: SourceTypes.BRANDWISE_SHOW
  }];
}

export function getCategoriesForDropdown() {
  return [{
    label: LABEL_EMPTY_OPTION,
    value: ''
  }, {
    label: LABEL_CLEAN,
    value: Categories.CLEAN
  }, {
    label: LABEL_EXEMPTED,
    value: Categories.EXEMPTED
  }];
}


export function dateFieldsForDropdown() {
  return [
    { label: LABEL_EMPTY_OPTION, value: '' },
    { label: LABEL_CREATED_ON, value: Order.CREATED_ON },
    { label: LABEL_DATE_CREATED_EBS, value: Order.DATE_CREATED_EBS },
    { label: LABEL_SHIP_DATE, value: Order.SHIP_DATE },
    { label: LABEL_CANCEL_DATE, value: Order.CANCEL_DATE },
  ];
}

export function searchFieldsForDropdown() {
  return [
    { label: LABEL_EMPTY_OPTION, value: '' },
    { label: LABEL_SALE_ORDER, value: Order.ORDER_NO },
    { label: LABEL_CUSTOMER_PO_NO, value: Order.CUSTOMER_PO_NUMBER }
  ];
}
