import { isValid } from '../../EmailFormat';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.']
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        validate: {
            validator: isValid,
            messsage: "{VALUE} is not a valid email address."
        },
    },
    fullname: {
        type: String,
        required: [true, 'Fullname is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
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

UserSchema.plugin(mongoosePaginate);
export const UserModel = mongoose.model('user', UserSchema);