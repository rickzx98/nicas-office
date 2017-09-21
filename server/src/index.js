import { ChainList, ChainStrictModeEnabled, ExecuteChain } from 'fluid-chains';
import { ClusterChains, DatabaseChains, ExpressApp, GDSDomainResource, Logger, LoggerChains, ServerChains } from 'gds-stack';
import { CustomerResource, OrderResource, UserResource } from './app/';

import cors from 'cors';

const PORT = process.env.PORT || 5000;
const DB = process.env.DB || 'office-db';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const LOGGER_NAME = process.env.LOGGER_NAME || 'nica-office';

ChainStrictModeEnabled();
ExecuteChain([
    ClusterChains.CLUSTER_CONFIG,
    LoggerChains.LOGGER_CONFIG,
    DatabaseChains.MONGO_CONFIG,
    DatabaseChains.MONGO_CONNECT,
    ServerChains.GDS_SERVER_CONFIG,
    ServerChains.GDS_SERVER_HTTP_LISTENER], {
        mongo_databaseName: DB,
        mongo_host: DB_HOST,
        mongo_port: DB_PORT,
        mongo_user: DB_USER,
        mongo_password: DB_PASSWORD,
        mongo_retry: 5,
        logger_name: LOGGER_NAME,
        logger_filePath: `${LOGGER_NAME}.log`,
        server_port: PORT
    }, (result) => {
        if (!result.$err) {
            ExpressApp.use(cors({
                origin: '*',
                methods: ['GET', 'PUT', 'HEAD', 'POST', 'DELETE'],
                optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
            }));
            Logger(LOGGER_NAME).info(`Server is connected in port ${PORT}`);
            const NicaResource = new GDSDomainResource(ExpressApp, 'api');
            new CustomerResource(NicaResource);
            new OrderResource(NicaResource);
            new UserResource(NicaResource);
            ExpressApp.get('/api', (req, res) => {
                res.status(200).send(NicaResource.getDTO(req));
            });
            ExpressApp.get('/api/chains', (req, res) => {
                res.status(200).send(ChainList());
            });
        }
    });




