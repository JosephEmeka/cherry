import express from 'express';
import appointmentsRoutes from '../src/modules/appointments/routes/appointmentRoutes'
import userRoutes from '../src/modules/users/routes/userRoutes';
import authRoutes from '../src/modules/auth/routes/authRoutes';
import notificationRoutes from '../src/modules/notification/routes/notificationRoutes';


const router = express.Router();


router.use('/api/users', userRoutes);

router.use('/api/auth', authRoutes);

router.use('/api/appointments', appointmentsRoutes);

router.use('/api/notifications', notificationRoutes);

export default router;
