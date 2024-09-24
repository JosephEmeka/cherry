const express = require('express');
const { getMedicalHistory, bookAppointment } = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/medical-history', authMiddleware, getMedicalHistory);
router.post('/book-appointment', authMiddleware, bookAppointment);

module.exports = router;
