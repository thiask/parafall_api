
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';
import { plano } from './planos';

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
    rg_emissor: {
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
    idPlano: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
    mensalidade_anuidade: {
        type: Sequelize.STRING
    },
    dependente: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    idFiliadoDependent: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    idConvidante: {
        type: Sequelize.INTEGER
    }
})

cliente.belongsTo(usuario, { foreignKey: 'id_usr_cad' });
cliente.belongsTo(plano, { foreignKey: 'idPlano' });

// cliente.sync({ alter: true });

export { cliente };