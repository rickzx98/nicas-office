export { OrderModel } from './Order';
export { BRANDWISE_ROAD, BRANDWISE_SHOW, EMAIL, PHONE, WEB } from './SourceTypeEnum';
export { PROCESSED, UNPROCESSED } from './StatusEnum';
export { CLEAN, EXEMPTED } from './CategoryEnum';

export const Order = {
    ORDER_ID: '_id',
    ORDER_NO: 'orderNo',
    CUSTOMER_PO_NUMBER: 'customerPONumber',
    CUSTOMER_NAME: 'customerName',
    PO_RECEIVED_DATE: 'poReceivedDate',
    PO_RECEIVED_TIME: 'poReceivedDateTime',
    SOURCE_TYPE: 'sourceType',
    DATE_CREATED_EBS: 'dateCreatedEBS',
    TIME_CREATED_EBS: 'timeCreatedEBS',
    SHIP_DATE: 'shipDate',
    CANCEL_DATE: 'cancelDate',
    REQUEST_DATE: 'requestDate',
    AMOUNT: 'amount',
    COMMENTS: 'comments',
    STATUS: 'status',
    CATEGORY: 'category',
    CREATED_BY: 'createdBy',
    UPDATED_BY: 'updatedBy',
    CREATED_ON: 'createdOn'
};
