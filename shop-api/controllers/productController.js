import Product from '../models/productModel.js';

// const getProducts = async (req, res) => {
//     const page = req.query.page;

//     const products = await Product.find({
//         category: req.query.category,
//     });
//     res.json(products);
// };

const getProducts = async (req, res) => {
    const { page = 1, limit = 10, sort, categories, search } = req.query;
    const skip = (page - 1) * limit;

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
        const products = await Product.find(query).sort(sort).skip(skip).limit(parseInt(limit));
        console.log(products);

        res.json(products);
    } catch (error) {
        res.status(404).json({ error: 'No Product Found' });
    }
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    }

    res.status(404);
    throw new Error('Product not found');
};

export { getProducts, getProductById };
