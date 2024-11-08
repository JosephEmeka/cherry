import express from 'express';
import { sendEmail, sendWhatsApp } from '../controllers/notificationControllers.js';

const router = express.Router();

router.post('/email', sendEmail);
router.post('/sms', sendWhatsApp);

export default router;
