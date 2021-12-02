
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';

const tipo = sequelize.define('tipo_produtos', {
    descricao: {
        type: Sequelize.STRING
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

tipo.belongsTo(usuario, { foreignKey: 'idUsrCad' });

// tipo.sync({alter: true});

export { tipo };