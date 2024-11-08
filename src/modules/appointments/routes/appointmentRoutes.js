import express from 'express';
import { authMiddleware, roleMiddleware } from '../../auth/middleware/authMiddleware';
import * as appointmentController from '../controllers/appointmentController';

const router = express.Router();

router.post('/book', authMiddleware, appointmentController.bookAppointment);
router.post('/assign', authMiddleware, roleMiddleware(['admin']), appointmentController.assignDoctor);
router.get('/patient/appointments', authMiddleware, roleMiddleware(['patient']), appointmentController.getPatientAppointments);
router.get('/doctor/appointments', authMiddleware, roleMiddleware(['doctor']), appointmentController.getDoctorAppointments);
router.post('/cancel', authMiddleware, appointmentController.cancelAppointment);
router.get('/all', authMiddleware, roleMiddleware(['admin']), appointmentController.getAllAppointments);

export default router;
