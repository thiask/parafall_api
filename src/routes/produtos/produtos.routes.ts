import { Router } from "express";
import { produto } from "../../models/produto/produto";
import { unidade } from '../../models/produto/unidade';
import { tipo } from '../../models/produto/tipo';

const router_produtos = Router();

router_produtos.post('/cadastrar', async (req, res) => {
    const result = await produto.create(req.body);
    res.json(result);
});

router_produtos.put('/alterar', async (req, res) => {
    const result = await produto.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json(result);
});

router_produtos.delete('/deletar/:id', async (req, res) => {
    const result = await produto.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_produtos.get('/listar', async (req, res) => {
    const result = await produto.findAll({
        include: [
            {
                model: unidade,
                required: true
            },
            {
                model: tipo,
                required: true
            },
        ]
    }
    );
    res.json(result);
});

export { router_produtos };