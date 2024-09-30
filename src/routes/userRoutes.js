
const { registerUser } = require('../controllers/userController');
const express = require('express');
const { uploadProfilePicture } = require('../controllers/userController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();
router.post('/register', registerUser);

router.post('/profile/upload', upload.single('profileImage'), uploadProfilePicture);

module.exports = router;