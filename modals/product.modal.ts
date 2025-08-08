import mongoose ,{Schema, Document} from 'mongoose'

interface ProductSchema extends Document{
    title: string,
    description: string,
    thumbnail: string,
    price: number,
    userId: mongoose.Types.ObjectId,
    productStockAmount: number,
    purchaseAt: Date
}

const ProductSchema : Schema<ProductSchema> = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }, 
    thumbnail: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productStockAmount: {
        type: Number,
        required: true,
        default: 0
    },
    purchaseAt: {
        type: Date,
        default: Date.now
    }
})


export const Product = mongoose.models.products || mongoose.model<ProductSchema>("Product", ProductSchema)

