import User from '../models/userModel.js';
import users from '../data/users.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get all users
// @route   GET /api/users
const getUsers = asyncHandler(async (req, res) => {
    await res.json(users);
    // const users = await User.find({});
    // res.json(users);
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userInDatabase = await User.findOne({ email });

    if (userInDatabase) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('User data not valid');
    }
});

export { getUsers, registerUser };
