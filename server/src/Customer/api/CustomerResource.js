import { CREATE_CUSTOMER_API, DELETE_CUSTOMER_API, GET_CUSTOMERS_API, UPDATE_CUSTOMER_API } from './chain.info';

import { ExecuteChain } from 'fluid-chains';
import { PaginateHelper } from '../../PaginateHelper';
import lodash from 'lodash';

const API = 'customers/';

export class CustomerResource {
    constructor(resource) {
        resource.post(CREATE_CUSTOMER_API, `${API}`, (req, res) => {
            ExecuteChain(CREATE_CUSTOMER_API, {
                userId: req.body.userId,
                customerName: req.body.customerName
            }, result => { res.status(result.status()).send(result.dto()) });
        });
        resource.delete(DELETE_CUSTOMER_API, `${API}:customerId`, (req, res) => {
            ExecuteChain(DELETE_CUSTOMER_API, {
                customerId: req.params.customerId
            }, result => { res.status(result.status()).send(result.dto()) });
        });
        resource.put(UPDATE_CUSTOMER_API, `${API}:customerId`, (req, res) => {
            ExecuteChain(UPDATE_CUSTOMER_API, {
                customerId: req.params.customerId,
                inputData: req.body
            }, result => { res.status(result.status()).send(result.dto()) });
        });
        resource.get(GET_CUSTOMERS_API, `${API}`, (req, res) => {
            const query = lodash.clone(req.query);
            lodash.unset(query, 'page_limit');
            lodash.unset(query, 'page_offset');
            lodash.unset(query, 'page_current');
            lodash.unset(query, 'page_sort');
            lodash.unset(query, 'page_select');
            lodash.unset(query, 'page_populate');
            ExecuteChain(GET_CUSTOMERS_API, {
                query,
                paginate: new PaginateHelper(req)
            }, result => { res.status(result.status()).send(result.dto()) });
        });
    }
}