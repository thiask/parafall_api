
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';
import { cliente } from './cliente';
import { funcionario } from './funcionarios';

const filiacoes = sequelize.define('filiacoes', {
    idCliente: {
        type: Sequelize.INTEGER
    },
    idFuncionarioIndicacao: {
        type: Sequelize.INTEGER
    },
    vencimentoFiliacao: {
        type: Sequelize.DATE
    },
    formaPag: {
        type: Sequelize.STRING
    },
    valor: {
        type: Sequelize.DOUBLE
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'ABERTO',
    },
    dataPagamento: {
        type: Sequelize.DATE
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

filiacoes.belongsTo(usuario, { foreignKey: 'idUsrCad' });
filiacoes.belongsTo(cliente, { foreignKey: 'idCliente' });
filiacoes.belongsTo(funcionario, { foreignKey: 'idFuncionarioIndicacao' });

// filiacoes.sync({ alter: true });

export { filiacoes };