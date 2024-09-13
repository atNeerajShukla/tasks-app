import { Router } from 'express';
import User from '../models/userModel.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router();

// User registration route
router.post('/register', async (req, res) => {
    const { username, password, isAdmin } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        username,
        password: hashedPassword,
        isAdmin
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// User login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin }, // You can add more payload data as needed
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token, isAdmin: user.isAdmin });
});

export default router;
