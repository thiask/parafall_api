
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';
import { processo } from './processo';

const forma_pag_processo = sequelize.define('forma_pagamento_processo', {
    formaPag: {
        type: Sequelize.STRING
    },
    valor: {
        type: Sequelize.DOUBLE
    },
    idProcesso: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

forma_pag_processo.belongsTo(usuario, { foreignKey: 'idUsrCad' });
forma_pag_processo.belongsTo(processo, { foreignKey: 'idProcesso' });

// forma_pag_processo.sync({ alter: true });

export { forma_pag_processo };