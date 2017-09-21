import { Chain } from 'fluid-chains';
import { USER_ERROR_HANDLER } from './chain.info';
import { getLogger } from '../../AppLogger';

new Chain(USER_ERROR_HANDLER, (context, param, next) => {
    getLogger().info(USER_ERROR_HANDLER + ' has been invoked.');
    getLogger().error(param.$err && param.$errorMessage());

    context.set('$err', param.$err());
    context.set('$errorMessage', param.$errorMessage());
    next();
});