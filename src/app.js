const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(userRoutes);


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;

