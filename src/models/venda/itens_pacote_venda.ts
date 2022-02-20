
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';
import { venda } from './venda';
import { pacote } from '../pacotes/pacotes';

const itens_pacote_venda = sequelize.define('itens_pacotes_vendas', {
    valor: {
        type: Sequelize.DOUBLE
    },
    idVenda: {
        type: Sequelize.INTEGER
    },
    idPacote: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

itens_pacote_venda.belongsTo(usuario, { foreignKey: 'idUsrCad' });
itens_pacote_venda.belongsTo(venda, { foreignKey: 'idVenda' });
itens_pacote_venda.belongsTo(pacote, { foreignKey: 'idPacote' });

// itens_pacote_venda.sync({ alter: true });

export { itens_pacote_venda };