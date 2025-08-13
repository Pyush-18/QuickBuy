import mongoose ,{Schema, Document} from 'mongoose'

interface UserSchema extends Document{
    username: string,
    email: string,
    password: string,
    isVerified: boolean,
    cart: {
        productId: mongoose.Types.ObjectId,
        quantity: number
    }[]
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
    cart: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product'}, quantity: { type: Number, default: 1}}] 
}, {timestamps: true})


export const User = mongoose.models.users || mongoose.model<UserSchema>("User", UserSchema)

