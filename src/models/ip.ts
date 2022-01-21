
import Sequelize from 'sequelize';

import { sequelize } from '../config/db';

const ip = sequelize.define('ip', {
    address: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    }
})

// ip.sync({ alter: true });

export { ip };