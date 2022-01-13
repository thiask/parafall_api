import { Router } from "express";
import { cliente } from '../models/cliente';
import { usuario } from '../models/usuario';

const router_cliente = Router();

router_cliente.post('/', async (req, res) => {
    const result = await cliente.create(req.body);
    console.log(result);
    res.json({ status: 1, data: result });
})

router_cliente.put('/', async (req, res) => {
    const result = await cliente.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_cliente.delete('/:id', async (req, res) => {
    const result = await cliente.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_cliente.get('/', async (req, res) => {
    const result = await cliente.findAll({
        include: [
            {
                model: usuario,
                required: true
            },
        ]
    });
    res.json(result);
});

router_cliente.get('/listar', async (req, res) => {
    const result = await cliente.findAll({
        attributes: [['id', 'code'], ['nome', 'name']]
    });
    res.json(result);
})

export { router_cliente }