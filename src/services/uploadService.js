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

module.exports = { uploadFile };
