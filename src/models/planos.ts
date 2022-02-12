
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';


const plano = sequelize.define('planos', {
    descricao: {
        type: Sequelize.STRING
    },
    descontoArmas: {
        type: Sequelize.INTEGER
    },
    qtdConvidados: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

plano.belongsTo(usuario, { foreignKey: 'idUsrCad' });

// plano.sync({ alter: true });

export { plano };