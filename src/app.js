const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConfig');

// Import routes
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
