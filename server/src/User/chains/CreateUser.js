import { CREATE_USER, USER_ERROR_HANDLER } from './chain.info';

import { Chain } from 'fluid-chains';
import { UserModel } from '../entity/';

const chain = new Chain(CREATE_USER, action, undefined, USER_ERROR_HANDLER);

chain.addSpec('username')
    .require()
    .validator((currentValue, valid) => {
        UserModel.find({ username: currentValue }).then(result => {
            if (result) {
                valid(false, `User ${currentValue} already exists.`);
            } else {
                valid(true);
            }
        }).catch(() => {
            valid(true);
        });
    });

chain.addSpec('email')
    .require()
    .validator((currentValue, valid) => {
        UserModel.find({ email: currentValue }).then(result => {
            if (result) {
                valid(false, `Email address ${currentValue} already exists.`);
            } else {
                valid(true);
            }
        }).catch(() => {
            valid(true);
        });
    });

function action(context, param, next) {

}