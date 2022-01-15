
import Sequelize from 'sequelize';

import { sequelize } from '../config/db';

const usuario = sequelize.define('usuarios', {
    usuario: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    },
    nivel: {
        type: Sequelize.STRING
    }
})

// usuario.sync({ alter: true });

export { usuario };