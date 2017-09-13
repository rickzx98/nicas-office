import { CUSTOMER_ERROR_HANDLER, UPDATE_CUSTOMER } from './chain.info';

import { Chain } from 'fluid-chains';
import { CustomerModel } from '../entity/';

const UpdateCustomerChain = new Chain(UPDATE_CUSTOMER, (context, param, next) => {
    const _id = param.customerId();
    CustomerModel.findByIdAndUpdate(_id, param.inputData())
        .then(result => {
            context.set('customerUpdatedData', result);
            next();
        })
        .catch(error => {
            next(error);
        });
}, undefined, CUSTOMER_ERROR_HANDLER);
UpdateCustomerChain.addSpec('customerId').require();
UpdateCustomerChain.addSpec('inputData').require();