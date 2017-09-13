'use strict';

var _fluidChains = require('fluid-chains');

var _gdsStack = require('gds-stack');

var _app = require('./app/');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 5000;
var DB = process.env.DB || 'office-db';
var DB_HOST = process.env.DB_HOST || 'localhost';
var DB_PORT = process.env.DB_PORT || 27017;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var LOGGER_NAME = process.env.LOGGER_NAME || 'nica-office';

(0, _fluidChains.ChainStrictModeEnabled)();
(0, _fluidChains.ExecuteChain)([_gdsStack.ClusterChains.CLUSTER_CONFIG, _gdsStack.LoggerChains.LOGGER_CONFIG, _gdsStack.DatabaseChains.MONGO_CONFIG, _gdsStack.DatabaseChains.MONGO_CONNECT, _gdsStack.ServerChains.GDS_SERVER_CONFIG, _gdsStack.ServerChains.GDS_SERVER_HTTP_LISTENER], {
    mongo_databaseName: DB,
    mongo_host: DB_HOST,
    mongo_port: DB_PORT,
    mongo_user: DB_USER,
    mongo_password: DB_PASSWORD,
    mongo_retry: 5,
    logger_name: LOGGER_NAME,
    logger_filePath: LOGGER_NAME + '.log',
    server_port: PORT
}, function (result) {
    if (!result.$err) {
        (0, _gdsStack.Logger)(LOGGER_NAME).info('Server is connected in port ' + PORT);
        var NicaResource = new _gdsStack.GDSDomainResource(_gdsStack.ExpressApp, 'api');
        new _app.CustomerResource(NicaResource);
        new _app.OrderResource(NicaResource);
        _gdsStack.ExpressApp.use((0, _cors2.default)({
            origin: true,
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        }));
        _gdsStack.ExpressApp.get('/api', function (req, res) {
            res.status(200).send(NicaResource.getDTO(req));
        });
        _gdsStack.ExpressApp.get('/api/chains', function (req, res) {
            res.status(200).send((0, _fluidChains.ChainList)());
        });
    }
});