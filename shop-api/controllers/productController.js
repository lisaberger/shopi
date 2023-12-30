import Product from '../models/productModel.js';

const getProducts = async (req, res) => {
    const { categories, search } = req.query;

    let query = {};

    if (categories) {
        query = { ...query, category: { $in: categories } };
    }

    if (search) {
        const searchRegex = new RegExp(search, 'i');
        query = { ...query, $or: [{ name: searchRegex }, { description: searchRegex }] };
    }

    const products = await Product.find(query);

    if (products) {
        return res.json(products);
    }

    res.status(404);
    throw new Error('No products found');
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('annotations');

    if (product) {
        return res.json(product);
    }

    res.status(404);
    throw new Error('Product not found');
};

export { getProducts, getProductById };
