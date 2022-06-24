
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';
import { cliente } from './cliente';
import { funcionario } from './funcionarios';

const contasReceber = sequelize.define('contasRecebers', {
    idCliente: {
        type: Sequelize.INTEGER
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

contasReceber.belongsTo(usuario, { foreignKey: 'idUsrCad' });
contasReceber.belongsTo(cliente, { foreignKey: 'idCliente' });
contasReceber.belongsTo(funcionario, { foreignKey: 'idFuncionarioIndicacao' });

// contasReceber.sync({ alter: true });

export { contasReceber };