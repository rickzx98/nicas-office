import { CREATE_CUSTOMER, CUSTOMER_ERROR_HANDLER, DELETE_CUSTOMER, GET_CUSTOMERS, UPDATE_CUSTOMER } from '../chains/chain.info';
import { CREATE_CUSTOMER_API, DELETE_CUSTOMER_API, GET_CUSTOMERS_API, UPDATE_CUSTOMER_API } from './chain.info';
import { Chain, ExecuteChain } from 'fluid-chains';

import { GDSDomainDTO } from 'gds-stack';

const CreateCustomerAPI = new Chain(CREATE_CUSTOMER_API, (context, param, next) => {
    ExecuteChain(CREATE_CUSTOMER, {
        name: param.customerName(),
        createdBy: param.userId()
    }, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + CREATE_CUSTOMER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(CREATE_CUSTOMER_API, result.customerCreatedData()));
            next();
        }
    });
});

CreateCustomerAPI.addSpec('customerName').require();
CreateCustomerAPI.addSpec('userId').require();

const DeleteCustomerAPI = new Chain(DELETE_CUSTOMER_API, (context, param, next) => {
    ExecuteChain(DELETE_CUSTOMER, {
        customerId: param.customerId()
    }, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + DELETE_CUSTOMER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(DELETE_CUSTOMER_API, result.customerDeleteData()));
            next();
        }
    });
});

DeleteCustomerAPI.addSpec('customerId').require();


const UpdateCustomerAPI = new Chain(UPDATE_CUSTOMER_API, (context, param, next) => {
    ExecuteChain(UPDATE_CUSTOMER, {
        customerId: param.customerId(),
        inputData: param.inputData()
    }, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + UPDATE_CUSTOMER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(UPDATE_CUSTOMER_API, result.customerUpdatedData()));
            next();
        }
    });
});

UpdateCustomerAPI.addSpec('customerId').require();
UpdateCustomerAPI.addSpec('inputData').require();

const GetCustomersAPI = new Chain(GET_CUSTOMERS_API, (context, param, next) => {
    const paginate = param.paginate();
    ExecuteChain(GET_CUSTOMERS, {
        query: param.query(),
        paginate
    }, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + GET_CUSTOMERS_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(GET_CUSTOMERS_API, result.customerFetchedData()));
            next();
        }
    });
}, undefined, CUSTOMER_ERROR_HANDLER);

GetCustomersAPI.addSpec('query');
GetCustomersAPI.addSpec('paginate');