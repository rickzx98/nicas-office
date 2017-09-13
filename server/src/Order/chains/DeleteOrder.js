import { Chain } from 'fluid-chains';
import { DELETE_ORDER } from './chain.info';
import { OrderModel } from '../entity/';

const OrderChain = new Chain(DELETE_ORDER, (context, param, next) => {
    const orderId = param.orderId();
    OrderModel.findByIdAndRemove(orderId)
        .then(data => {
            context.set('orderDeletedData', data);
            next();
        }).catch(error => {
            next(error);
        });
});
OrderChain.addSpec('orderId').require();