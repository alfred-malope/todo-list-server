const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/add', taskController.addTask);
router.get('/', taskController.getAllTasks);
router.get('/user', taskController.getUserTasks);
router.delete('/delete', taskController.deleteTask);
router.put('/update', taskController.updateTask);
router.get('/search', taskController.searchTasks);

module.exports = router;
