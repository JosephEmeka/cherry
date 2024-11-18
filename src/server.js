const express = require('express');
const sequelize = require('./config/dbConfig');
const app = express(); // Define the app instance
const cors = require('cors');

require('dotenv').config();


app.use(cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.get('/api', (req, res) => {
    res.json({ message: "CORS enabled!" });
});


const PORT = process.env.PGPORT || 5000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');


        await sequelize.sync();
        console.log('Database tables created or updated...');


        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Error syncing the database:', error);
    }
})();

