import { BRANDWISE_ROAD, BRANDWISE_SHOW, EMAIL, PHONE, WEB } from './SourceTypeEnum';
import { CLEAN, EXEMPTED } from './CategoryEnum';
import { PROCESSED, UNPROCESSED } from './StatusEnum';

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const OrderSchema = new mongoose.Schema({
    orderNo: {
        type: String,
        maxlength: [10, 'Order Number should not exceed more than 10 characters'],
    },
    customerPONumber: {
        type: String,
        maxlength: [10, 'Customer PO Number should not exceed more than 10 characters'],
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
        enum: [EMAIL, WEB, PHONE, BRANDWISE_ROAD, BRANDWISE_SHOW]
    },
    dateCreatedEBS: {
        type: Date,
        required: function () {
            const thisModel = this;
            return !!thisModel.orderNo;
        }
    },
    shipDate: {
        type: Date,
    },
    cancelDate: {
        type: Date,
    },
    requestDate: {
        type: Date,
        required: [true, 'Please enter the request date.']
    },
    amount: {
        type: String,
        required: [true, 'Please enter the amount.']
    },
    comments: String,
    status: {
        type: String,
        enum: [PROCESSED, UNPROCESSED],
        required: [true, 'Please select a status.']
    },
    category: {
        type: String,
        required: [true, 'Please select a category.'],
        enum: [CLEAN, EXEMPTED]
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

OrderSchema.plugin(mongoosePaginate);
export const OrderModel = mongoose.model('order', OrderSchema);