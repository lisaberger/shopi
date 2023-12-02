import express from 'express';
import {
    getUsers,
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUserById,
    deleteUser,
    updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser).get(getUsers);
router.post('/login', loginUser);
router.post('logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);

export default router;
