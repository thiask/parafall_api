import { Router } from "express";
import { sequelize } from "../../config/db";
import { unidade } from '../../models/produto/unidade';
import { tipo } from '../../models/produto/tipo';
import { pacote } from "../../models/pacotes/pacotes";
import { itens_pacote } from "../../models/pacotes/item_pacotes";

const router_pacotes = Router();

router_pacotes.post('/cadastrar', async (req, res) => {
    req.body.pacote.idUsrCad = req.body.idUsrCad;

    const result: any = await pacote.create(req.body.pacote);

    const newArray: any = [];

    req.body.itensPacote.map((value: any) => {
        const aux = {
            idPacote: result.id,
            idProduto: value.id,
            idUsrCad: req.body.idUsrCad,
            qtd: value.qtd
        };

        newArray.push(aux);
    })

    const itens = await itens_pacote.bulkCreate(newArray);
    res.json(result);
});

router_pacotes.post('/addItem', async (req, res) => {
    const result = await itens_pacote.create(req.body);
    res.json(result);
});

router_pacotes.put('/alterar', async (req, res) => {
    const result = await pacote.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json(result);
});

router_pacotes.delete('/deletar/:id', async (req, res) => {
    const result2 = await itens_pacote.destroy({ where: { idPacote: req.params.id } });
    const result = await pacote.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_pacotes.get('/listarItens/:idPacote', async (req, res) => {
    const result = await sequelize.query(`SELECT produtos.id, produtos.descricao, itens_pacotes.qtd FROM itens_pacotes
    INNER JOIN produtos on produtos.id = itens_pacotes.idProduto
    WHERE idPacote  = ${req.params.idPacote}`);

    res.json(result[0]);
});

router_pacotes.get('/listar', async (req, res) => {
    const result = await pacote.findAll({
        include: [
            {
                model: unidade,
                required: true
            },
            {
                model: tipo,
                required: true
            },
        ]
    }
    );
    res.json(result);
});


export { router_pacotes };