import express from 'express';
import { getUsers } from '../controllers/user-controller.js';

const router = express.Router();

router.route('/').get(getUsers);

export default router;
