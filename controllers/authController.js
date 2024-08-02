const User = require('../models/userModel');

// Register user
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.send({ success: true });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).send({ success: false, error: 'Registration failed' });
    }
};

// Sign in user
exports.signInUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            // Log sign-in event
            const task = new Task({
                task: `${username}, Hi, start using me!`,
                taskDate: new Date(),
                userId: user._id,
            });
            await task.save();
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    } catch (err) {
        console.error('Sign-in error:', err.message);
        res.status(500).send({ success: false, error: 'Sign-in failed due to a server error' });
    }
};
