const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/AuthRoutes');
const userRoutes = require('./Routes/UserRoutes');
const courseRoutes = require('./Routes/CourseRoutes');
const timeTableRoutes = require('./Routes/TimeTableRoutes');
const roomRoutes = require('./Routes/RoomRoutes');

// Database connection function
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit process with failure
    }
};

// Initialize database connection
dbConnection();

const app = express();

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON requests
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // JWT-protected routes
app.use("/api/courses", courseRoutes);
app.use("/api/timeTable", timeTableRoutes);
app.use("/api/rooms", roomRoutes);

// Start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});


//practice branch