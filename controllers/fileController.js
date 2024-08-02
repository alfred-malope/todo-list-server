const multer = require('multer');
const path = require('path');
const File = require('../models/fileModel');

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

exports.uploadProfilePicture = async (req, res) => {
    const { username } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send({ success: false, error: 'No file uploaded' });
    }

    try {
        const newFile = new File({ filePath: file.path, username });
        await newFile.save();
        res.send({ success: true, message: 'Profile picture uploaded successfully' });
    } catch (err) {
        console.error('Upload profile picture error:', err.message);
        res.status(500).send({ success: false, error: 'Failed to upload profile picture' });
    }
};
