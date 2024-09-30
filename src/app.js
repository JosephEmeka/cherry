const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_ADMIN_USERNAME,
    host: 'localhost',
    database: 'cherry_db',
    password: process.env.PG_ADMIN_PASSWORD,
    port: 5432,
});

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL');
    } catch (err) {
        console.error('Connection error', err.stack);
        process.exit(1); // Exit the application if unable to connect
    }
};

// Connect to the database
connectToDatabase();

const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handle unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit the process
});
