
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';

const fornecedor = sequelize.define('fornecedores', {
    nome: {
        type: Sequelize.STRING
    },
    cpf_cnpj: {
        type: Sequelize.STRING
    },
    endereco: {
        type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

fornecedor.belongsTo(usuario, { foreignKey: 'idUsrCad' });

// fornecedor.sync({ alter: true });

export { fornecedor };