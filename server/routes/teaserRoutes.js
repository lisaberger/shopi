import express from 'express';
import { getTeasers } from '../controllers/teaserController.js';

const router = express.Router();

router.route('/').get(getTeasers);

export default router;
