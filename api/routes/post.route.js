import express from 'express';
import { create, getposts } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifiyUser.js';

const router = express.Router();
router.post('/create', verifyToken, create);
router.get('/getposts', getposts);

export default router;