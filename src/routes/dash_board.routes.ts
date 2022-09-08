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

    const sql = `SELECT produtos.id as idProduto, sum(itens_vendas.qtd) as qtdVendida, sum(itens_vendas.valor * itens_vendas.qtd) as totalVendido, produtos.descricao FROM vendas
    INNER JOIN itens_vendas on itens_vendas.idVenda = vendas.id
    INNER JOIN produtos on produtos.id = itens_vendas.idProduto
    INNER JOIN clientes on clientes.id = vendas.idCliente
    WHERE vendas.createdAt BETWEEN '${req.params.dataInicial}' AND '${req.params.dataFinal} 23:59' ${getIdClient()}
    group by produtos.id`;

    const result: any = await sequelize.query(sql);
    let clientes: any = [];

    if (aux == '') {
        for (let index = 0; index < result[0].length; index++) {
            const sql = `SELECT clientes.nome, itens_vendas.qtd, itens_vendas.valor FROM itens_vendas
            INNER JOIN vendas on vendas.id = itens_vendas.idVenda
            INNER JOIN clientes on clientes.id = vendas.idCliente
            WHERE idProduto = ${result[0][index].idProduto} AND itens_vendas.createdAt BETWEEN '${req.params.dataInicial}' AND '${req.params.dataFinal} 23:59'`;
            const newClientes: any = await sequelize.query(sql);
            console.log(sql);

            result[0][index].clientes = newClientes[0];
        }
    }

    res.json(result[0]);
});

router_dash_board.get('/estatistics/contasRecebidas/:dataInicial/:dataFinal/:idCliente', async (req, res) => {

    const getIdClient = () => {

        if (req.params.idCliente !== '0')
            return ` AND clientes.id = ${req.params.idCliente}`;
        else return '';
    }

    const aux = getIdClient();

    const sql = `SELECT sum(contasrecebers.valor) as totalVendido, clientes.nome FROM contasrecebers
    INNER JOIN clientes on clientes.id = contasrecebers.idCliente
    WHERE contasrecebers.dataPagamento BETWEEN '${req.params.dataInicial}' AND '${req.params.dataFinal} 23:59' ${getIdClient()}
    GROUP BY contasrecebers.idCliente`;

    const result = await sequelize.query(sql);
    console.log(result);
    res.json(result[0]);
});


export default router_dash_board;