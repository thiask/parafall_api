import { Router } from "express";
import { forma_pag_processo } from "../models/processos/forma_pagamento_processo";

const router_forma_pag_processo = Router();

router_forma_pag_processo.post('/', async (req, res) => {
    const result = await forma_pag_processo.create(req.body);
    res.json({ status: 1, data: result });
})

router_forma_pag_processo.put('/', async (req, res) => {
    const result = await forma_pag_processo.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_forma_pag_processo.delete('/:id', async (req, res) => {
    const result = await forma_pag_processo.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_forma_pag_processo.get('/', async (req, res) => {
    const result = await forma_pag_processo.findAll();
    res.json(result);
});

router_forma_pag_processo.get('/:idProcesso', async (req, res) => {
    const result = await forma_pag_processo.findAll({
        where: {
            idProcesso: req.params.idProcesso
        }
    });
    res.json(result);
});

export { router_forma_pag_processo }