const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_profile_pictures', // Folder in Cloudinary where images will be stored
        allowed_formats: ['jpg', 'png', 'jpeg'], // Accepted formats
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // Image transformation
    },
});

const upload = multer({ storage });

module.exports = upload;