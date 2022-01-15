import { Router } from "express";
import { venda } from "../models/venda/venda";
import { itens_venda } from '../models/venda/itens_venda';
import { cliente } from "../models/cliente";
import { produto } from "../models/produto/produto";
import { sequelize, Sequelize } from "../config/db";

const router_venda = Router();

router_venda.post('/cadastrar', async (req, res) => {
    const result = await venda.create(req.body);

    res.json({ status: 1, data: result });
});

router_venda.get('/listar', async (req, res) => {
    const result = await sequelize.query(`SELECT vendas.*, clientes.nome, clientes.tipoCliente FROM vendas
    INNER JOIN clientes on clientes.id = vendas.idCliente`);

    res.json(result[0]);
});

router_venda.get('/listar/:id', async (req, res) => {
    const result = await venda.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: cliente,
                required: true
            },
        ]
    });

    res.json(result);
});

router_venda.put('/finalizar', async (req, res) => {

    await venda.update(
        { status: 'Finalizada' },
        {
            where: {
                id: req.body.idVenda
            }
        });

    res.json({ status: 1 });
});

router_venda.post('/itens_venda/cadastrar', async (req, res) => {
    const valorVenda = req.body.valor * req.body.qtd;
    console.log(req.body);

    await venda.update(
        { valor: Sequelize.literal(`valor + ${valorVenda}`) },
        {
            where: {
                id: req.body.idVenda
            }
        });

    await itens_venda.create(req.body);

    res.json({ status: 1 });
});

router_venda.put('/itens_venda/acresentar', async (req, res) => {
    const valorVenda = req.body.valor * req.body.qtd;

    await venda.update(
        { valor: Sequelize.literal(`valor + ${valorVenda}`) },
        {
            where: {
                id: req.body.idVenda
            }
        });

    await itens_venda.update(
        {
            qtd: Sequelize.literal(`qtd + ${req.body.qtd}`)
        },

        {
            where: {
                idVenda: req.body.idVenda
            }
        });

    res.json({ status: 1 });
});

router_venda.get('/itens_venda/listar/:idVenda', async (req, res) => {

    const result = await sequelize.query(`SELECT itens_vendas.*, produtos.descricao FROM itens_vendas
    INNER JOIN produtos on produtos.id = itens_vendas.idProduto
    WHERE itens_vendas.idVenda = ${req.params.idVenda}`);

    res.json(result[0]);
});

export { router_venda }