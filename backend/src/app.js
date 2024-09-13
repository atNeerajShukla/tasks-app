import express, { json, urlencoded } from 'express';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(json({ limit: "16kb" }))
app.use(urlencoded({ extended: true, limit: "16kb" }))

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);


// Mock login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verify user credentials (mock example)
    if (username === 'user' && password === 'pass') {
        // Create a JWT token for the authenticated user
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


export { app };

