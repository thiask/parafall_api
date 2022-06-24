import { Router } from "express";
import { servicos } from "../models/servicos";
import { usuario } from "../models/usuario";

import { sequelize, Sequelize } from "../config/db";
import { Model } from "sequelize/dist";

const router_servicos = Router();

router_servicos.post('/', async (req, res) => {
    const result = await servicos.create(req.body);
    res.json({ status: 1, data: result });
})

router_servicos.put('/', async (req, res) => {
    const result = await servicos.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_servicos.delete('/:id', async (req, res) => {
    const result = await servicos.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_servicos.get('/', async (req, res) => {
    const result = await servicos.findAll({
        include: [
            {
                model: usuario,
                required: true
            },
        ],
    });
    res.json(result);
});

router_servicos.get('/listar', async (req, res) => {
    const result = await servicos.findAll({
        attributes: [['id', 'code'], ['nome', 'name'], ['valor', 'valor']],
        order: [
            ['nome', 'ASC'],
        ],
    });
    res.json(result);
})


export { router_servicos }