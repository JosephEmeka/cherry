const { Sequelize } = require("sequelize");

// Define the database URL
const dbUrl = process.env.DATABASE_URL ||
    `postgres://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Only necessary if using a self-signed certificate
        }
    }
});

module.exports = sequelize;
