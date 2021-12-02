import { Router } from "express";
import { unidade } from "../../models/produto/unidade";

const router_unidade = Router();

router_unidade.post('/cadastrar', async (req, res) => {
    const result = await unidade.create(req.body);
    res.json(result);
})

export { router_unidade };