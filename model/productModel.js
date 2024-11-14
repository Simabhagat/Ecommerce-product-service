import mongoose from "mongoose";


// define schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothing', 'accessories'], // example categories
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product;