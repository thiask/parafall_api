
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';
import { cliente } from '../cliente';

const venda = sequelize.define('venda', {
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

venda.belongsTo(usuario, { foreignKey: 'idUsrCad' });
venda.belongsTo(cliente, { foreignKey: 'idCliente' });

// venda.sync({ alter: true });

export { venda };