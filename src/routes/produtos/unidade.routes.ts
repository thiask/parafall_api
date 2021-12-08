import { Router } from "express";
import { unidade } from "../../models/produto/unidade";

const router_unidade = Router();

router_unidade.post('/cadastrar', async (req, res) => {
    const result = await unidade.create(req.body);
    res.json(result);
})

router_unidade.get('/listar', async (req, res) => {
    const result = await unidade.findAll({
        attributes: [['id', 'code'], ['descricao', 'name']]
    });
    res.json(result);
})

export { router_unidade };