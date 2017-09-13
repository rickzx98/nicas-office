'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomerModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomerSchema = new _mongoose2.default.Schema({
    name: {
        unique: true,
        type: String,
        required: [true, 'Customer name is required.']
    },
    createdBy: {
        type: String,
        required: [true, 'Customer author name is needed.']
    },
    updatedBy: {
        type: String
    },
    updatedOn: Date,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

CustomerSchema.plugin(_mongoosePaginate2.default);
var CustomerModel = exports.CustomerModel = _mongoose2.default.model('customer', CustomerSchema);