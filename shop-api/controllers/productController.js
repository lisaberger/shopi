import Product from '../models/productModel.js';

const getProducts = async (req, res) => {
    const { categories, search } = req.query;

    let query = {};

    if (categories) {
        const categoryArray = categories.split(',');
        query = { ...query, category: { $in: categoryArray } };
    }

    if (search) {
        const searchRegex = new RegExp(search, 'i');
        query = { ...query, $or: [{ name: searchRegex }, { description: searchRegex }] };
    }

    try {
        const products = await Product.find(query);

        res.json(products);
    } catch (error) {
        res.status(404).json({ error: 'No Product Found' });
    }
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
