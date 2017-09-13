import { CUSTOMER_ERROR_HANDLER, DELETE_CUSTOMER } from './chain.info';

import { Chain } from 'fluid-chains';
import { CustomerModel } from '../entity/';

const DeleteCustomerChain = new Chain(DELETE_CUSTOMER, (context, param, next) => {
    const _id = param.customerId();
    CustomerModel.findByIdAndRemove(_id)
        .then(result => {
            context.set('customerDeleteData', result);
            next();
        })
        .catch(error => {
            next(error);
        });
}, undefined, CUSTOMER_ERROR_HANDLER);
DeleteCustomerChain.addSpec('customerId').require();