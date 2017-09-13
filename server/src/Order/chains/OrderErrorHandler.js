import { Chain } from 'fluid-chains';
import { ORDER_ERROR_HANDLER } from './chain.info';
import { getLogger } from '../../AppLogger';

const OrderChain = new Chain(ORDER_ERROR_HANDLER, (context, param, next) => {
    getLogger().info(ORDER_ERROR_HANDLER + ' has been invoked.');
    getLogger().error(param.$err && param.$errorMessage());

    context.set('$err', param.$err());
    context.set('$errorMessage', param.$errorMessage());
    next();
});