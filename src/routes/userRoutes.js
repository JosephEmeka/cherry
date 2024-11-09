const { login } = require('../controllers/userController');
const { registerUser } = require('../controllers/userController');
const express = require('express');
const { uploadProfilePicture } = require('../controllers/userController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.post('/api/users/register', registerUser);
router.post('/api/users/login', login);
router.post('/api/users/profile-upload', upload.single('profileImage'), uploadProfilePicture);

module.exports = router;