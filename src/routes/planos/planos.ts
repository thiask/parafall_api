import { Router } from "express";
import { plano } from "../../models/planos";
import { sequelize } from "../../config/db";

const router_plano = Router();

router_plano.post('/cadastrar', async (req, res) => {
    const result = await plano.create(req.body);
    res.json(result);
})

router_plano.get('/listar', async (req, res) => {
    const result = await plano.findAll({
        attributes: [['id', 'code'], ['descricao', 'name']]
    });
    res.json(result);
})

router_plano.get('/listarNew', async (req, res) => {
    const result = await plano.findAll();
    res.json(result);
})

router_plano.put('/alterar', async (req, res) => {
    const result = await plano.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json(result);
});

router_plano.delete('/deletar/:id', async (req, res) => {
    const result = await plano.destroy({ where: { id: req.params.id } });
    res.json(result);
});

export { router_plano };