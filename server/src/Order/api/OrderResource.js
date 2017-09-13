import { CREATE_ORDER_API, DELETE_ORDER_API, DOWNLOAD_ORDER_AS_CSV, GET_ALL_ORDERS_API, GET_ORDERS_API, UPDATE_ORDER_API } from './chain.info';
import {
    LABEL_AMOUNT,
    LABEL_CANCEL_DATE,
    LABEL_CATEGORY,
    LABEL_COMMENTS,
    LABEL_CREATED_BY,
    LABEL_CREATED_ON,
    LABEL_CUSTOMER,
    LABEL_CUSTOMER_PO_NO,
    LABEL_DATE_CREATED_EBS,
    LABEL_DATE_FIELD,
    LABEL_DATE_FROM,
    LABEL_DATE_TO,
    LABEL_EDIT,
    LABEL_ORDERS,
    LABEL_PO_RECIVED_DATE,
    LABEL_RECEIVED_VIA,
    LABEL_REFRESH,
    LABEL_REMOVE,
    LABEL_REQUEST_DATE,
    LABEL_SALE_ORDER,
    LABEL_SEARCH,
    LABEL_SHIP_DATE,
    LABEL_STATUS,
} from '../../labels/';

import { ExecuteChain } from 'fluid-chains';
import { Order } from '../entity/';
import { PaginateHelper } from '../../PaginateHelper';
import { QueryHelper } from '../../QueryHelper';
import csvWriter from 'csv-write-stream';
import lodash from 'lodash';

const API = 'orders/';

export class OrderResource {
    constructor(resource) {
        resource.post(CREATE_ORDER_API, `${API}`, (req, res) => {
            ExecuteChain(CREATE_ORDER_API, {
                inputBody: req.body
            }, result => { res.status(result.status()).send(result.dto()) });
        });
        resource.delete(DELETE_ORDER_API, `${API}:orderId`, (req, res) => {
            ExecuteChain(DELETE_ORDER_API, {
                orderId: req.params.orderId
            }, result => { res.status(result.status()).send(result.dto()) });
        });
        resource.put(UPDATE_ORDER_API, `${API}:orderId`, (req, res) => {
            ExecuteChain(UPDATE_ORDER_API, {
                orderId: req.params.orderId,
                inputBody: req.body
            }, result => { res.status(result.status()).send(result.dto()) });
        });
        resource.get(GET_ORDERS_API, `${API}`, (req, res) => {
            const query = lodash.clone(req.query);
            lodash.unset(query, 'page_limit');
            lodash.unset(query, 'page_offset');
            lodash.unset(query, 'page_current');
            lodash.unset(query, 'page_sort');
            lodash.unset(query, 'page_select');
            lodash.unset(query, 'page_populate');
            ExecuteChain(GET_ORDERS_API, {
                query: new QueryHelper(query),
                paginate: new PaginateHelper(req)
            }, result => { res.status(result.status()).send(result.dto()) });
        });
        resource.get(DOWNLOAD_ORDER_AS_CSV, `${API}csv`, (req, res) => {
            const query = lodash.clone(req.query);
            lodash.unset(query, 'page_limit');
            lodash.unset(query, 'page_offset');
            lodash.unset(query, 'page_current');
            lodash.unset(query, 'page_sort');
            lodash.unset(query, 'page_select');
            lodash.unset(query, 'page_populate');
            ExecuteChain(GET_ALL_ORDERS_API, {
                query: new QueryHelper(query),
                paginate: new PaginateHelper(req)
            }, result => {
                if (result.status() === 200) {
                    res.setHeader('Content-type', 'text/csv');
                    res.setHeader('Content-disposition', `attachment; filename=order_${new Date().getTime()}.csv`);
                    const data = result.dto().data;
                    if (data && data.length > 0) {
                        const writer = csvWriter();
                        data.forEach(order => {
                            const writeOrder = {};
                            writeOrder[LABEL_SALE_ORDER] = order[Order.ORDER_NO];
                            writeOrder[LABEL_CUSTOMER_PO_NO] = order[Order.CUSTOMER_PO_NUMBER];
                            writeOrder[LABEL_CUSTOMER] = order[Order.CUSTOMER_NAME];
                            writeOrder[LABEL_PO_RECIVED_DATE] = order[Order.PO_RECEIVED_DATE];
                            writeOrder[LABEL_RECEIVED_VIA] = order[Order.SOURCE_TYPE];
                            writeOrder[LABEL_DATE_CREATED_EBS] = order[Order.DATE_CREATED_EBS];
                            writeOrder[LABEL_REQUEST_DATE] = order[Order.REQUEST_DATE];
                            writeOrder[LABEL_SHIP_DATE] = order[Order.SHIP_DATE];
                            writeOrder[LABEL_CANCEL_DATE] = order[Order.CANCEL_DATE];
                            writeOrder[LABEL_AMOUNT] = order[Order.AMOUNT];
                            writeOrder[LABEL_STATUS] = order[Order.STATUS];
                            writeOrder[LABEL_CATEGORY] = order[Order.CATEGORY];
                            writeOrder[LABEL_COMMENTS] = order[Order.COMMENTS];
                            writeOrder[LABEL_CREATED_ON] = order[Order.CREATED_ON];
                            writeOrder[LABEL_CREATED_BY] = order[Order.CREATED_BY];
                            writer.write(writeOrder);
                        });
                        writer.pipe(res);
                        writer.end();
                    } else {
                        res.status(result.status()).send(result.dto());
                    }
                } else {
                    res.status(result.status()).send(result.dto());
                }
            });
        })
    }
}