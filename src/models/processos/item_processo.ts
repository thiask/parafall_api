
import Sequelize from 'sequelize';

import { sequelize } from '../../config/db';
import { usuario } from '../usuario';
import { processo } from './processo';
import { servicos } from '../servicos';

const itens_processo = sequelize.define('itens_processos', {
    qtd: {
        type: Sequelize.DOUBLE
    },
    valor: {
        type: Sequelize.DOUBLE
    },
    idProcesso: {
        type: Sequelize.INTEGER
    },
    idServico: {
        type: Sequelize.INTEGER
    },
    idUsrCad: {
        type: Sequelize.INTEGER
    },
})

itens_processo.belongsTo(usuario, { foreignKey: 'idUsrCad' });
itens_processo.belongsTo(processo, { foreignKey: 'idProcesso' });
itens_processo.belongsTo(servicos, { foreignKey: 'idServico' });

// itens_processo.sync({alter: true});

export { itens_processo };