import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import waitlistRoutes from './routes/waitlistRoutes.js';
import tripRoutes from './routes/tripRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — only allow specific origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()) : [])
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error(`CORS: Origin '${origin}' not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/trips', tripRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'TrekTribe Backend is running' });
});

// Database Connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
