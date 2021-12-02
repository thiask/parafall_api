
import Sequelize from 'sequelize';

import { sequelize } from '../config/db';

const usuario = sequelize.define('usuarios', {
    usuario: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    }
})

export { usuario };