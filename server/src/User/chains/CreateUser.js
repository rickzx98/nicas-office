import { CREATE_USER, USER_ERROR_HANDLER } from './chain.info';

import { Chain } from 'fluid-chains';
import { UserModel } from '../entity/';

const chain = new Chain(CREATE_USER, action, undefined, USER_ERROR_HANDLER);
chain.addSpec('fullname').require();
chain.addSpec('password').require();
chain.addSpec('createdBy').require();
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
    const fullname = param.fullname();
    const password = param.password();
    const createdBy = param.createdBy();
    const username = param.username();
    const email = param.email();
    UserModel.create({
        fullname, password, createdBy, username, email
    }).then(user => {
        context.set('user', user);
        next();
    }).catch(err => {
        next(err);
    });
}