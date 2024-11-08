import express from 'express';
import { registerUser, uploadProfilePicture } from '../controllers/userController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/profile-upload', upload.single('profileImage'), uploadProfilePicture);

export default router;
