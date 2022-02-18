
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';
import { produto } from '../produto/produto';
import { pacote } from './pacotes';

const itens_pacote = sequelize.define('itens_pacote', {
    qtd: {
        type: Sequelize.DOUBLE
    },
    idPacote: {
        type: Sequelize.INTEGER
    },
    idProduto: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

itens_pacote.belongsTo(usuario, { foreignKey: 'idUsrCad' });
itens_pacote.belongsTo(produto, { foreignKey: 'idProduto' });
itens_pacote.belongsTo(pacote, { foreignKey: 'idPacote' });

// itens_pacote.sync({ alter: true });

export { itens_pacote };