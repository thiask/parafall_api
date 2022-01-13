
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';
import { venda } from './venda';
import { produto } from '../produto/produto';

const itens_venda = sequelize.define('itens_vendas', {
    
    qtd: {
        type: Sequelize.DOUBLE
    },
    valor: {
        type: Sequelize.DOUBLE
    },
    idVenda: {
        type: Sequelize.INTEGER
    },
    idProduto: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

itens_venda.belongsTo(usuario, { foreignKey: 'idUsrCad' });
itens_venda.belongsTo(venda, { foreignKey: 'idVenda' });
itens_venda.belongsTo(produto, { foreignKey: 'idProduto' });

// itens_venda.sync({alter: true});

export { itens_venda };