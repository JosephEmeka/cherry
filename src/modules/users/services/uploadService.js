const { Doctor, LabScientist, Patient } = require('../models');

const path = require('path');
const fs = require('fs');

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileName = Date.now() + path.extname(file.originalname);
        const uploadPath = path.join(__dirname, '../uploads', fileName);

        fs.writeFile(uploadPath, file.buffer, (err) => {
            if (err) reject(err);
            resolve(uploadPath);
        });
    });
};


const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) reject(err);
            resolve({ message: 'File deleted successfully' });
        });
    });
};




const shareFileWithUser = async (filePath, userId, userType) => {
    try {
        let user;

        if (userType === 'doctor') {
            user = await Doctor.findByPk(userId);
        } else if (userType === 'labScientist') {
            user = await LabScientist.findByPk(userId);
        } else {
            throw new Error('Invalid user type');
        }

        if (!user) throw new Error('User not found');


        const fileUrl = `http://localhost:3000/uploads/${path.basename(filePath)}`; 

        return { message: `File shared with ${user.name}`, fileUrl };

    } catch (error) {
        throw new Error('Error sharing file: ' + error.message);
    }
};

module.exports = { uploadFile, deleteFile, shareFileWithUser };





