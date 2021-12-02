import { Router } from "express";
import { tipo } from "../../models/produto/tipo";

const router_tipo = Router();

router_tipo.post('/cadastrar', async (req, res) => {
    const result = await tipo.create(req.body);
    res.json(result);
})

export { router_tipo };