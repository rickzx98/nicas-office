import { CUSTOMER_ERROR_HANDLER, GET_CUSTOMERS } from './chain.info';

import { Chain } from 'fluid-chains';
import { CustomerModel } from '../entity/';

const GetCustomersChain = new Chain(GET_CUSTOMERS, (context, param, next) => {
    const query = param.query();
    const regexed = Object.assign(query, { name: new RegExp(query.name, 'i') });
    const paginate = param.paginate();
    CustomerModel.paginate(regexed, paginate, (err, result) => {
        if (!err) {
            const pages = Math.floor((result.total + paginate.limit - 1) / paginate.limit);
            context.set('customerFetchedData', Object.assign({ pages, page: paginate.page }, result));
        }
        next(err);
    });
}, undefined, CUSTOMER_ERROR_HANDLER);

GetCustomersChain.addSpec('query').default({});
GetCustomersChain.addSpec('paginate').default({
    limit: 25,
    offset: 0,
    page: 1
});