import Category from '../models/categoryModel.js';
import asyncHandler from 'express-async-handler';

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});

    if (categories) {
        return res.json(categories);
    }

    res.status(404);
    throw new Error('No categories found');
});

export { getCategories };
