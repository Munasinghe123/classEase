const express = require('express');
const dotenv = require('dotenv').config();
const dbConnection = require('./Config/dbConnection');
const authRoutes = require('./Routes/AuthRoutes');
const userRoutes = require('./Routes/UserRoutes')
const cors = require('cors');
const path = require('path');

console.log("Port:", process.env.PORT);  // Debugging

//dbconnstion
dbConnection();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS for all routes
app.use(cors());

//middle ware
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); //jwt protected routes

//port
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})

//jaya RBAC