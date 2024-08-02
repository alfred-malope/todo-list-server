const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filePath: { type: String, required: true },
    username: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
