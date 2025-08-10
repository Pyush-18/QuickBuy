import mongoose ,{Schema, Document} from 'mongoose'

interface UserSchema extends Document{
    username: string,
    email: string,
    password: string,
    isVerified: boolean,
    productId: mongoose.Types.ObjectId[]
}

const UserSchema: Schema<UserSchema> = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    productId: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]   
}, {timestamps: true})


export const User = mongoose.models.users || mongoose.model<UserSchema>("User", UserSchema)

