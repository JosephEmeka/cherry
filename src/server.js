const app = require('./app');
const { Pool } = require('pg');
require('dotenv').config();
const sequelize = require('./config/dbConfig');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const PORT = process.env.PORT || 5000;



sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');


        sequelize.sync({ force: false })
            .then(() => {
                console.log('Database tables created or updated...');
                app.listen(PORT, () => {
                    console.log(`Server is running on port ${PORT}`);
                });
            })
            .catch(err => console.error('Error syncing the database:', err));
    })
    .catch(err => console.error('Unable to connect to the database:', err));