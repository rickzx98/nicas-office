import { CREATE_CUSTOMER, CUSTOMER_ERROR_HANDLER } from './chain.info';

import { Chain } from 'fluid-chains';
import { CustomerModel } from '../entity/';

const CreateCustomerChain = new Chain(CREATE_CUSTOMER, (context, param, next) => {
    const createdBy = param.createdBy();
    const name = param.name();
    CustomerModel.create({ createdBy, name })
        .then(result => {
            context.set('customerCreatedData', result);
            next();
        })
        .catch(error => {
            next(error);
        });
}, undefined, CUSTOMER_ERROR_HANDLER);

CreateCustomerChain.addSpec('createdBy').require();
CreateCustomerChain.addSpec('name').require();