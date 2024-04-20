import express from 'express';
import controller from '../auth/controller.js';

const router = express.Router();

router.post('/login', controller.userLogin);
router.post('/refresh_token', controller.refToken);
router.delete('/refresh_token', controller.deleteToken);


export default router;