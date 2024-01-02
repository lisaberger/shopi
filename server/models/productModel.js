import mongoose from 'mongoose';
import Annotation from './annotationModel.js';
import Category from './categoryModel.js';

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        preview: {
            type: String,
            required: true,
        },
        annotations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: 'Annotation',
            },
        ],
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        images: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
