
import Sequelize from 'sequelize';

import { sequelize } from '../config/db';

import { usuario } from './usuario';

const cliente = sequelize.define('clientes', {
    nome: {
        type: Sequelize.STRING
    },
    tipoCliente: {
        type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING
    },
    data_nascimento: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.STRING
    },
    sexo: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    rg: {
        type: Sequelize.STRING
    },
    estado_civil: {
        type: Sequelize.STRING
    },
    endereco: {
        type: Sequelize.STRING
    },
    cidade: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    observacoes: {
        type: Sequelize.STRING
    },
    id_usr_cad: {
        type: Sequelize.INTEGER
    }
})

cliente.belongsTo(usuario, { foreignKey: 'id_usr_cad' });

// cliente.sync({ alter: true });

export { cliente };