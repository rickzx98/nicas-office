const LOGGER_NAME = process.env.LOGGER_NAME || 'nica-office';

import { Logger } from 'gds-stack';

export const getLogger = () => {
    return Logger(LOGGER_NAME);
}