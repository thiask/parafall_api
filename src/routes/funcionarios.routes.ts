import { Router } from "express";
import { funcionario } from "../models/funcionarios";
import { usuario } from "../models/usuario";

const router_funcionario = Router();

router_funcionario.post('/', async (req, res) => {
    const result = await funcionario.create(req.body);
    res.json({ status: 1, data: result });
})

router_funcionario.put('/', async (req, res) => {
    const result = await funcionario.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_funcionario.delete('/:id', async (req, res) => {
    const result = await funcionario.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_funcionario.get('/', async (req, res) => {
    const result = await funcionario.findAll({
        include: [
            {
                model: usuario,
                required: true
            },
        ],
    });
    res.json(result);
});

router_funcionario.get('/listar', async (req, res) => {
    const result = await funcionario.findAll({
        attributes: [['id', 'code'], ['nome', 'name']],
        order: [
            ['nome', 'ASC'],
        ],
    });
    res.json(result);
})


export { router_funcionario }