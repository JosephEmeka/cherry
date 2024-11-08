import { login, logout } from '../controllers/authController.js';
import express from 'express';

const router = express.Router();
router.post('/login', login);
router.post('/logout', logout);

export default router;
