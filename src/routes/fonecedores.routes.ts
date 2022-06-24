import { Router } from "express";
import { fornecedor } from "../models/fornecedor";
import { usuario } from "../models/usuario";

const router_fornecedor = Router();

router_fornecedor.post('/', async (req, res) => {
    const result = await fornecedor.create(req.body);
    res.json({ status: 1, data: result });
})

router_fornecedor.put('/', async (req, res) => {
    const result = await fornecedor.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_fornecedor.delete('/:id', async (req, res) => {
    const result = await fornecedor.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_fornecedor.get('/', async (req, res) => {
    const result = await fornecedor.findAll({
        include: [
            {
                model: usuario,
                required: true
            },
        ],
    });
    res.json(result);
});

router_fornecedor.get('/listar', async (req, res) => {
    const result = await fornecedor.findAll({
        attributes: [['id', 'code'], ['nome', 'name']],
        order: [
            ['nome', 'ASC'],
        ],
    });
    res.json(result);
})


export { router_fornecedor }