
import Sequelize from 'sequelize';
import { sequelize } from '../config/db';
import { usuario } from './usuario';
import { cliente } from './cliente';


const convidado = sequelize.define('convidados', {
    idConvidado: {
        type: Sequelize.INTEGER
    },
    idConvidante: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

convidado.belongsTo(usuario, { foreignKey: 'idUsrCad' });
convidado.belongsTo(cliente, { foreignKey: 'idConvidado' });
convidado.belongsTo(cliente, { foreignKey: 'idConvidante' });

// convidado.sync({ alter: true });

export { convidado };