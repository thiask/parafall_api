
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';

import { usuario } from '../usuario';
import { tipo } from '../produto/tipo';
import { unidade } from '../produto/unidade';

const pacote = sequelize.define('pacotes', {
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
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

pacote.belongsTo(usuario, { foreignKey: 'idUsrCad' });
pacote.belongsTo(tipo, { foreignKey: 'tipo' });
pacote.belongsTo(unidade, { foreignKey: 'unidade' });

// pacote.sync({ alter: true });

export { pacote };