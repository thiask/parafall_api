import { Router } from "express";
import { cliente } from "../models/cliente";
import { usuario } from "../models/usuario";
import { contasReceber } from "../models/contasReceber";

const router_contas_receber = Router();

router_contas_receber.post('/', async (req, res) => {
    console.log(req.body);
    const result = await contasReceber.create(req.body);
    res.json({ status: 1, data: result });
})

router_contas_receber.put('/', async (req, res) => {
    const result = await contasReceber.update(
        req.body,
        {
            where: {
                id: req.body.id
            } 
        });
    res.json({ status: 1, data: result });
});

router_contas_receber.delete('/:id', async (req, res) => {
    const result = await contasReceber.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_contas_receber.get('/', async (req, res) => {
    const result = await contasReceber.findAll({
        include: [
            {
                model: usuario,
                required: true
            },
            {
                model: cliente,
                required: true
            },
        ],
    });
    res.json(result);
});



export { router_contas_receber }