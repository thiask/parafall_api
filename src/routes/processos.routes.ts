import { Router } from "express";
import { sequelize, Sequelize } from "../config/db";

import { itens_processo } from "../models/processos/item_processo";
import { processo } from "../models/processos/processo";

const router_processo = Router();

router_processo.post('/cadastrar', async (req, res) => {
    const result = await processo.create(req.body);

    res.json({ status: 1, data: result });
});

router_processo.get('/listar', async (req, res) => {
    const result = await sequelize.query(`SELECT processos.*, clientes.nome, clientes.tipoCliente, planos.descricao as plano FROM processos
    INNER JOIN clientes on clientes.id = processos.idCliente 
    INNER JOIN planos on planos.id = clientes.idPlano
    order by processos.id desc`);
    let aux: any = {};
    const newArray = await Promise.all(result[0].map(async value => {

        const result2 = await sequelize.query(`SELECT itens_processos.*, servicos.nome FROM itens_processos
        INNER JOIN servicos on servicos.id = itens_processos.idServico
        WHERE itens_processos.idProcesso = ${value.id}`);

        return aux = { data: value, itens: result2[0] }
    }))
    
    res.json(newArray);
});

router_processo.get('/listar/:id', async (req, res) => {
    const result = await sequelize.query(`SELECT clientes.idPlano, processos.*, clientes.nome, clientes.tipoCliente, planos.descricao as plano FROM processos
    INNER JOIN clientes on clientes.id = processos.idCliente 
    INNER JOIN planos on planos.id = clientes.idPlano where processos.id = ${req.params.id}
    order by processos.id desc`);

    res.json(result[0]);
});

router_processo.put('/finalizar', async (req, res) => {

    await processo.update(
        { status: 'Finalizada' },
        {
            where: {
                id: req.body.idProcesso
            }
        });

    res.json({ status: 1 });
});

router_processo.post('/itens_processo/cadastrar', async (req, res) => {
    console.log(req.body);

    const valorVenda = req.body.valor;


    await processo.update(
        { valor: Sequelize.literal(`valor + ${valorVenda}`) },
        {
            where: {
                id: req.body.idProcesso
            }
        });

    await itens_processo.create(req.body);

    res.json({ status: 1 });
});

interface itensPacotes {
    valor: string,
    pacote: string,
    itens: [{}]
}

router_processo.get('/itensPacote/:idVenda', async (req, res) => {
    const result = await sequelize.query(`SELECT itens_pacotes_vendas.valor, pacotes.descricao as pacote, produtos.descricao, itens_pacotes.qtd FROM itens_pacotes_vendas
    INNER JOIN itens_pacotes on itens_pacotes.idPacote = itens_pacotes_vendas.idPacote
    INNER JOIN produtos on produtos.id = itens_pacotes.idProduto
    INNER JOIN pacotes on pacotes.id = itens_pacotes_vendas.idPacote
    where itens_pacotes_vendas.idVenda = ${req.params.idVenda}`);

    let aux = 0;
    let array: itensPacotes[] = [];

    const data: any = result[0];

    let pacote = '';
    let itens: any = [];

    for (let index = 0; index < data.length; index++) {
        if (index == 0) {
            pacote = data[index].pacote;
            itens.push(data[index]);
        } else {
            if (data[index].pacote != data[index - 1].pacote) {
                array.push({
                    valor: data[index].valor,
                    pacote: pacote,
                    itens: itens
                });

                itens = [];
                pacote = data[index].pacote;
                itens.push(data[index]);
            } else {
                itens.push(data[index]);
            }
            if (index == data.length - 1) {
                array.push({
                    valor: data[index].valor,
                    pacote: pacote,
                    itens: itens
                });
            }
        }
    }
    res.json(array);
});

router_processo.post('/itens_pacote/cadastrar', async (req, res) => {
    const valorVenda = req.body.valor * req.body.qtd;

    await processo.update(
        { valor: Sequelize.literal(`valor + ${valorVenda}`) },
        {
            where: {
                id: req.body.idVenda
            }
        });

    await itens_processo.create(req.body);

    res.json({ status: 1 });
});

router_processo.delete('/itens_venda/delete/:id', async (req, res) => {
    const item: any = await itens_processo.findOne({ where: { id: req.params.id } });

    await processo.update(
        { valor: Sequelize.literal(`valor - ${item.qtd * item.valor}`) },
        {
            where: {
                id: item.idVenda
            }
        });

    await itens_processo.destroy({ where: { id: req.params.id } });
    res.json("OK");
})

router_processo.put('/itens_processo/acresentar', async (req, res) => {
    const valorVenda = req.body.valor * req.body.qtd;


    await processo.update(
        { valor: Sequelize.literal(`valor + ${valorVenda}`) },
        {
            where: {
                id: req.body.idVenda
            }
        });

    await itens_processo.update(
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

router_processo.get('/itens_processo/listar/:idProcesso', async (req, res) => {

    const result = await sequelize.query(`SELECT itens_processos.*, servicos.nome FROM itens_processos
    INNER JOIN servicos on servicos.id = itens_processos.idServico
    WHERE itens_processos.idProcesso = ${req.params.idProcesso}`);

    res.json(result[0]);
});

export { router_processo }