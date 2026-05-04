const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    console.log('Signup Request Body:', req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('Signup: User already exists:', email);
            return res.status(409).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            console.log('Signup: Success:', email);
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    console.log('Login Request Body:', req.body);
    const { email, password } = req.body;

    // 1. Validation: Check if fields are missing
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // 2. Database Query: Fetch user by email
        const user = await User.findOne({ email }).select('+password');

        // 3. User Existence Check
        if (!user) {
            console.log('Login: User not found:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        // 4. Password Verification
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('Login: Invalid credentials for:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 5. Successful Login
        console.log('Login: Success:', email);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            avatar: user.avatar,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser
};
