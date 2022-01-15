import { Router } from "express";
import { forma_pag } from "../models/venda/forma_pagamento";
import { sequelize } from "../config/db";

const router_forma_pag = Router();

router_forma_pag.post('/', async (req, res) => {
    const result = await forma_pag.create(req.body);
    res.json({ status: 1, data: result });
})

router_forma_pag.put('/', async (req, res) => {
    const result = await forma_pag.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_forma_pag.delete('/:id', async (req, res) => {
    const result = await forma_pag.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_forma_pag.get('/', async (req, res) => {
    const result = await forma_pag.findAll();
    res.json(result);
});

router_forma_pag.get('/:idVenda', async (req, res) => {
    const result = await forma_pag.findAll({
        where: {
            idVenda: req.params.idVenda
        }
    });
    res.json(result);
});

export { router_forma_pag }