
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';
import { venda } from './venda';

const forma_pag = sequelize.define('forma_pagamento', {

    formaPag: {
        type: Sequelize.STRING
    },
    valor: {
        type: Sequelize.DOUBLE
    },
    idVenda: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

forma_pag.belongsTo(usuario, { foreignKey: 'idUsrCad' });
forma_pag.belongsTo(venda, { foreignKey: 'idVenda' });

// forma_pag.sync({alter: true});

export { forma_pag };