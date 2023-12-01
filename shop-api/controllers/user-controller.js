// import User from '../models/user-model.js';
import users from '../data/users.js';

// @desc    Get all users
// @route   GET /api/users
const getUsers = async (req, res) => {
    await res.json(users);
    // const users = await User.find({});
    // res.json(users);
};

export { getUsers };
