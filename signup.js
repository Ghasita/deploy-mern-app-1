const bcrypt = require('bcrypt');
const UserModel = require('../Models/Users');


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists ', success: false });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        // Save to DB
        await user.save();

        res.status(201).json({ message: 'Sign up success', success: true });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

module.exports = { signup };
