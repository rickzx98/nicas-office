import { CREATE_ORDER, DELETE_ORDER, GET_ALL_ORDERS, GET_ORDERS, ORDER_ERROR_HANDLER, UPDATE_ORDER } from '../chains/chain.info';
import { CREATE_ORDER_API, DELETE_ORDER_API, GET_ALL_ORDERS_API, GET_ORDERS_API, UPDATE_ORDER_API } from './chain.info';
import { Chain, ExecuteChain } from 'fluid-chains';

import { GDSDomainDTO } from 'gds-stack';

const CreateOrder = new Chain(CREATE_ORDER_API, (context, param, next) => {
    const body = param.inputBody();
    ExecuteChain(CREATE_ORDER, body, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + CREATE_ORDER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(CREATE_ORDER_API, result.orderCreatedData()));
            next();
        }
    }, undefined, ORDER_ERROR_HANDLER);
});
CreateOrder.addSpec('inputBody').require();

const UpdateOrder = new Chain(UPDATE_ORDER_API, (context, param, next) => {
    const inputData = param.inputBody();
    const orderId = param.orderId();
    ExecuteChain(UPDATE_ORDER, Object.assign({}, { inputData, orderId }), result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + UPDATE_ORDER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(UPDATE_ORDER_API, result.orderUpdatedData()));
            next();
        }
    }, undefined, ORDER_ERROR_HANDLER);
});
UpdateOrder.addSpec('orderId').require();
UpdateOrder.addSpec('inputBody').require();

const DeleteOrder = new Chain(DELETE_ORDER_API, (context, param, next) => {
    const orderId = param.orderId();
    ExecuteChain(DELETE_ORDER, { orderId }, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + DELETE_ORDER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(DELETE_ORDER_API, result.orderDeletedData()));
            next();
        }
    }, undefined, ORDER_ERROR_HANDLER);
});
DeleteOrder.addSpec('orderId').require();


const GetOrders = new Chain(GET_ORDERS_API, (context, param, next) => {
    const query = param.query();
    const paginate = param.paginate();
    ExecuteChain(GET_ORDERS, {
        query, paginate
    }, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + GET_ORDERS_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(GET_ORDERS_API, result.orderFetchedData()));
            next();
        }
    });
}, undefined, ORDER_ERROR_HANDLER);

GetOrders.addSpec('query');
GetOrders.addSpec('paginate');

const GetAllOrders = new Chain(GET_ALL_ORDERS_API, (context, param, next) => {
    const query = param.query();
    const paginate = param.paginate();
    ExecuteChain(GET_ALL_ORDERS, {
        query, paginate
    }, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + GET_ALL_ORDERS_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(GET_ALL_ORDERS_API, result.orderFetchedData()));
            next();
        }
    });
}, undefined, ORDER_ERROR_HANDLER);
GetAllOrders.addSpec('paginate').default({});
GetAllOrders.addSpec('query').default({});