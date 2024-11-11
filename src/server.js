require('dotenv').config();
const sequelize = require('./config/dbConfig');


const PORT = process.env.PGPORT || 5000;



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