
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';

const funcionario = sequelize.define('funcionarios', {
    nome: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

funcionario.belongsTo(usuario, { foreignKey: 'idUsrCad' });

// funcionario.sync({ alter: true });

export { funcionario };