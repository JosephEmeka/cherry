const express = require('express');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(express.json());
app.use(userRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;

