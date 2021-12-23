import { Router } from "express";
import { tipo } from "../../models/produto/tipo";

const router_tipo = Router();

router_tipo.post('/cadastrar', async (req, res) => {
    const result = await tipo.create(req.body);
    res.json(result);
})

router_tipo.get('/listar', async (req, res) => {
    const result = await tipo.findAll({
        attributes: [['id', 'code'], ['descricao', 'name']]
    });
    res.json(result);
})

router_tipo.get('/listarNew', async (req, res) => {
    const result = await tipo.findAll();
    res.json(result);
})

router_tipo.put('/alterar', async (req, res) => {
    const result = await tipo.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json(result);
});

router_tipo.delete('/deletar/:id', async (req, res) => {
    const result = await tipo.destroy({ where: { id: req.params.id } });
    res.json(result);
});

export { router_tipo };