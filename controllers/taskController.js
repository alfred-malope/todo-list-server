const Task = require('../models/taskModel');

// Add a task
exports.addTask = async (req, res) => {
    const { task, taskDate, userId } = req.body;
    try {
        const newTask = new Task({ task, taskDate, userId });
        const savedTask = await newTask.save();
        res.send({ success: true, taskID: savedTask._id });
    } catch (err) {
        console.error('Add task error:', err.message);
        res.status(500).send({ success: false, error: 'Failed to add task' });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send({ success: true, tasks });
    } catch (err) {
        console.error('Get tasks error:', err.message);
        res.status(500).send({ success: false, error: 'Failed to fetch tasks' });
    }
};

// Get tasks for a specific user
exports.getUserTasks = async (req, res) => {
    const { userId } = req.query;
    try {
        const tasks = await Task.find({ userId });
        res.send({ success: true, tasks });
    } catch (err) {
        console.error('Get user tasks error:', err.message);
        res.status(500).send({ success: false, error: 'Failed to fetch tasks' });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await Task.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(404).send({ success: false, error: 'Task not found' });
        } else {
            res.send({ success: true });
        }
    } catch (err) {
        console.error('Delete task error:', err.message);
        res.status(500).send({ success: false, error: 'Failed to delete task' });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { id, task, taskDate, priority, completed } = req.body;
    try {
        const result = await Task.updateOne({ _id: id }, { task, taskDate, priority, completed });
        if (result.nModified === 0) {
            res.status(404).send({ success: false, error: 'Task not found' });
        } else {
            res.send({ success: true });
        }
    } catch (err) {
        console.error('Update task error:', err.message);
        res.status(500).send({ success: false, error: 'Failed to update task' });
    }
};

// Search tasks
exports.searchTasks = async (req, res) => {
    const searchTerm = req.query.term;
    try {
        const tasks = await Task.find({ task: { $regex: searchTerm, $options: 'i' } });
        res.send({ success: true, tasks });
    } catch (err) {
        console.error('Search tasks error:', err.message);
        res.status(500).send({ success: false, error: 'Failed to search tasks' });
    }
};
