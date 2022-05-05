import { Router } from "express";

import { sequelize } from "../config/db";

const router_dash_board = Router();

router_dash_board.get('/estatistics/vendas/:dataInicial/:dataFinal/:idCliente', async (req, res) => {

    const getIdClient = () => {

        if (req.params.idCliente !== '0')
            return ` AND clientes.id = ${req.params.idCliente}`;
        else return '';
    }

    const aux = getIdClient();

    const sql = `SELECT count(itens_vendas.id) as qtdVendida, sum(itens_vendas.valor * itens_vendas.qtd) as totalVendido, produtos.descricao FROM vendas
    INNER JOIN itens_vendas on itens_vendas.idVenda = vendas.id
    INNER JOIN produtos on produtos.id = itens_vendas.idProduto
    INNER JOIN clientes on clientes.id = vendas.idCliente
    WHERE vendas.createdAt BETWEEN '${req.params.dataInicial}' AND '${req.params.dataFinal} 23:59' ${getIdClient()}
    group by produtos.id`;

    const result = await sequelize.query(sql);
    console.log(result);
    res.json(result[0]);
});


export default router_dash_board;