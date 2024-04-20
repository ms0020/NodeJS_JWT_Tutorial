import express from 'express';
import controller from './controller.js';

const router = express.Router();

router.get('/', controller.getUsers);
router.post('/new_user', controller.addUser);

export default router;