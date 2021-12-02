
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';

const unidade = sequelize.define('unidade_produtos', {
    descricao: {
        type: Sequelize.STRING
    },
    tag: {
        type: Sequelize.STRING
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})
unidade.belongsTo(usuario, { foreignKey: 'idUsrCad' });
// unidade.sync({ alter: true });

export { unidade };