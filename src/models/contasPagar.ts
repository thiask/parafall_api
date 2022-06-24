
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';
import { fornecedor } from './fornecedor';
import { funcionario } from './funcionarios';

const contasPagar = sequelize.define('contasPagar', {
    idFornecedor: {
        type: Sequelize.INTEGER
    },
    idFuncionario: {
        type: Sequelize.INTEGER
    },
    vencimento: {
        type: Sequelize.DATE
    },
    nDoc: {
        type: Sequelize.STRING
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
    obs: {
        type: Sequelize.STRING
    },
})

contasPagar.belongsTo(usuario, { foreignKey: 'idUsrCad' });
contasPagar.belongsTo(fornecedor, { foreignKey: 'idFornecedor' });
contasPagar.belongsTo(funcionario, { foreignKey: 'idFuncionario' });

// contasPagar.sync({ alter: true });

export { contasPagar };