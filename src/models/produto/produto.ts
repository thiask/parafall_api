
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';

import { usuario } from '../usuario';
import { tipo } from './tipo';
import { unidade } from './unidade';

const produto = sequelize.define('produtos', {
    descricao: {
        type: Sequelize.STRING
    },
    qtd: {
        type: Sequelize.FLOAT
    },
    qtd_min: {
        type: Sequelize.FLOAT
    },
    tipo: {
        type: Sequelize.INTEGER
    },
    unidade: {
        type: Sequelize.INTEGER
    },
    valorFiliado: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    valorConvidado: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    valorVisitante: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    id_usr_cad: {
        type: Sequelize.INTEGER
    },
})

produto.belongsTo(usuario, { foreignKey: 'id_usr_cad' });
produto.belongsTo(tipo, { foreignKey: 'tipo' });
produto.belongsTo(unidade, { foreignKey: 'unidade' });

// produto.sync({ alter: true });

export { produto };