import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('parafall', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
    },
    timezone: '-03:00'
});

export { sequelize, Sequelize };