import express from 'express';
import { test } from '../controllers/user.controller.js'; //remember to put.js at end
const router = express.Router();

router.get('/test', test);

export default router; // as we are exporting default we can change its name, here we say router but in index.js we can say userRoutes