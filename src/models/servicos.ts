
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';

const servicos = sequelize.define('servicos', {
    nome: {
        type: Sequelize.STRING
    },
    valor:{
        type: Sequelize.DOUBLE
    }
})

servicos.belongsTo(usuario, { foreignKey: 'idUsrCad' });

// servicos.sync({ alter: true });

export { servicos };