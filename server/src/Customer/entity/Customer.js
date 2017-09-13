import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const CustomerSchema = new mongoose.Schema({
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

CustomerSchema.plugin(mongoosePaginate);
export const CustomerModel = mongoose.model('customer', CustomerSchema);