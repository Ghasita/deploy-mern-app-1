const bcrypt = require('bcrypt');
const UserModel = require('../Models/Users');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        const errorMessage = "Auth failed, email or password wrong"
        if (!existingUser) {
            return res.status(400).json({ message: errorMessage, success: false });
        }
        const isPasssame = await bcrypt.compare(password, existingUser.password)
        if (!isPasssame) {
            return res.status(400).json({ message: errorMessage, success: false });
        }

        const jwtToken = jwt.sign({ email: existingUser.email, _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' })


        res.status(200).json({ message: 'Login success', success: true, jwtToken, email, name: existingUser.name });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

module.exports = { login };
