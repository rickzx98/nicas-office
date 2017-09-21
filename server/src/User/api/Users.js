import { CREATE_USER, USER_ERROR_HANDLER } from '../chains/chain.info';
import { Chain, ExecuteChain } from 'fluid-chains';

import { CREATE_USER_API } from './chain.info';
import { GDSDomainDTO } from 'gds-stack';

const CreateUser = new Chain(CREATE_USER_API, (context, param, next) => {
    const body = param.inputBody();
    ExecuteChain(CREATE_USER, body, result => {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new GDSDomainDTO('ERROR_' + CREATE_USER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new GDSDomainDTO(CREATE_USER_API, result.orderCreatedData()));
            next();
        }
    }, undefined, USER_ERROR_HANDLER);
});

CreateUser.addSpec('inputBody').require();