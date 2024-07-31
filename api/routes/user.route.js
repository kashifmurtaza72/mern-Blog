import express from 'express';
import { deleteUser, getUser, getUsers, signout, test, updateUser } from '../controllers/user.controller.js'; //remember to put.js at end
import { verifyToken } from '../utils/verifiyUser.js';
const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);

router.get('/:userId', getUser);


export default router; // as we are exporting default we can change its name, here we say router but in index.js we can say userRoutes