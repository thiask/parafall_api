import { Router } from "express";
import { produto } from "../../models/produto/produto";

const router_produtos = Router();

router_produtos.post('/cadastrar', async (req, res) => {
    const result = await produto.create(req.body);
    res.json(result);
})

export { router_produtos };