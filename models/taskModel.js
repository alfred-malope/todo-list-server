const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    taskDate: { type: Date, required: true },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    priority: { type: Number },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
