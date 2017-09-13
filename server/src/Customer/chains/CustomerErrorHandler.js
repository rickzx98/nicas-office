import { CUSTOMER_ERROR_HANDLER } from './chain.info';
import { Chain } from 'fluid-chains';
import { CustomerModel } from '../entity/';
import { getLogger } from '../../AppLogger';

const CustomerChain = new Chain(CUSTOMER_ERROR_HANDLER, (context, param, next) => {
    getLogger().info(CUSTOMER_ERROR_HANDLER + ' has been invoked.');
    getLogger().error(param.$err && param.$errorMessage());
    context.set('$err', param.$err());
    context.set('$errorMessage', param.$errorMessage());
    next();
});
