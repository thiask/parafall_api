
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';
import { cliente } from '../cliente';

const processo = sequelize.define('processos', {
    idCliente: {
        type: Sequelize.INTEGER
    },
    valor: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'Em aberto'
    },
    desconto: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    }
})

processo.belongsTo(usuario, { foreignKey: 'idUsrCad' });
processo.belongsTo(cliente, { foreignKey: 'idCliente' });

// processo.sync({ alter: true });

export { processo };