import { CREATE_USER_API } from './chain.info';
import { ExecuteChain } from 'fluid-chains';
import { PaginateHelper } from '../../PaginateHelper';
import { QueryHelper } from '../../QueryHelper';

const API = 'users/';

export class UserResource {
    constructor(resource) {
        resource.post(CREATE_USER_API, `${API}`, (req, res) => {
            ExecuteChain(CREATE_ORDER_API, {
                inputBody: req.body
            }, result => { res.status(result.status()).send(result.dto()) });
        });
    }
}