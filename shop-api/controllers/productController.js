import Product from '../models/productModel.js';
import products from '../data/products.js';

const getProducts = async (req, res) => {
    // const products = Product.find({});
    res.json(products);
};

const getProductById = async (req, res) => {
    const product = Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    }

    res.status(404);
    throw new Error('Product not found');
};

export { getProducts, getProductById };
