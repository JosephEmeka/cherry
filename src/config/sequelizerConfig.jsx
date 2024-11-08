import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.PG_ADMIN_USERNAME,
    process.env.PG_ADMIN_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: console.log,
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
