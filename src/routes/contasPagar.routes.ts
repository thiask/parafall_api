import { Router } from "express";
import { fornecedor } from "../models/fornecedor";
import { usuario } from "../models/usuario";
import { contasPagar } from "../models/contasPagar";
import { funcionario } from "../models/funcionarios";

const router_contas_pagar = Router();

router_contas_pagar.post('/', async (req, res) => {
    
    const result = await contasPagar.create(req.body);
    res.json({ status: 1, data: result });
})

router_contas_pagar.put('/', async (req, res) => {
    const result = await contasPagar.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_contas_pagar.delete('/:id', async (req, res) => {
    const result = await contasPagar.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_contas_pagar.get('/', async (req, res) => {
    const result = await contasPagar.findAll({
        order: [
            ['status', 'ASC'],
            ['vencimento', 'ASC'],
        ],
        include: [
            {
                model: usuario,
                required: true
            },
            {
                model: fornecedor,
                required: false
            },
            {
                model: funcionario,
                required: true
            },
        ],
    });
    res.json(result);
});



export { router_contas_pagar }