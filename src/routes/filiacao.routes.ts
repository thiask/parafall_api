import { Router } from "express";
import { cliente } from "../models/cliente";
import { usuario } from "../models/usuario";
import { filiacoes } from "../models/filiacoes";
import { funcionario } from "../models/funcionarios";

const router_filiacao = Router();

router_filiacao.post('/', async (req, res) => {
    const result = await filiacoes.create(req.body);
    res.json({ status: 1, data: result });
})

router_filiacao.put('/', async (req, res) => {
    const result = await filiacoes.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_filiacao.delete('/:id', async (req, res) => {
    const result = await filiacoes.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_filiacao.get('/', async (req, res) => {
    const result = await filiacoes.findAll({
        include: [
            {
                model: usuario,
                required: true
            },
            {
                model: cliente,
                required: true
            },
            {
                model: funcionario,
                required: false
            },
        ],
    });
    res.json(result);
});



export { router_filiacao }