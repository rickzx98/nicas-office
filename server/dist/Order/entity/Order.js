'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderModel = undefined;

var _SourceTypeEnum = require('./SourceTypeEnum');

var _CategoryEnum = require('./CategoryEnum');

var _StatusEnum = require('./StatusEnum');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseCurrency = require('mongoose-currency');

var _mongooseCurrency2 = _interopRequireDefault(_mongooseCurrency);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongooseCurrency2.default.loadType(_mongoose2.default);
var Currency = _mongoose2.default.Types.Currency;

var OrderSchema = new _mongoose2.default.Schema({
    orderNo: {
        type: Number,
        max: 10
    },
    customerPONumber: {
        type: Number,
        max: 50,
        required: [true, 'Customer PO Number is required.']
    },
    customerName: {
        type: String,
        max: 50,
        required: [true, 'Customer name is required.']
    },
    poReceivedDate: {
        type: Date,
        required: [true, 'PO received date is required.']
    },
    sourceType: {
        type: String,
        required: [true, 'Please specify source type.'],
        enum: [_SourceTypeEnum.EMAIL, _SourceTypeEnum.WEB, _SourceTypeEnum.PHONE, _SourceTypeEnum.BRANDWISE_ROAD, _SourceTypeEnum.BRANDWISE_SHOW]
    },
    dateCreatedEBS: {
        type: Date,
        required: function required() {
            var thisModel = this;
            return !!thisModel.orderNo;
        }
    },
    shipDate: {
        type: Date
    },
    cancelDate: {
        type: Date
    },
    requestDate: {
        type: Date,
        required: [true, 'Please enter the request date.']
    },
    amount: {
        type: Currency,
        required: [true, 'Please enter the amount.']
    },
    comments: String,
    status: {
        type: String,
        enum: [_StatusEnum.PROCESSED, _StatusEnum.UNPROCESSED],
        required: [true, 'Please select a status.']
    },
    category: {
        type: String,
        required: [true, 'Please select a category.'],
        enum: [_CategoryEnum.CLEAN, _CategoryEnum.EXEMPTED]
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

OrderSchema.plugin(_mongoosePaginate2.default);
var OrderModel = exports.OrderModel = _mongoose2.default.model('order', OrderSchema);