import { Router } from "express";
import { produto } from "../../models/produto/produto";
import { unidade } from '../../models/produto/unidade';
import { tipo } from '../../models/produto/tipo';
import { plano } from "../../models/planos";
import { sequelize } from "../../config/db";

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

router_produtos.get('/listarCustom/:tipoProduto/:idPlano', async (req, res) => {

    const plan: any = await plano.findOne({
        where: { id: req.params.idPlano },
        raw: true
    });

    // const descontoArm = plan.descontoArmas;

    let aux = 'valorFiliado as valor';

    if (req.params.tipoProduto == '4' || req.params.tipoProduto == '6')
        aux = `valorFiliado - (valorFiliado * ${plan.descontoArmas / 100}) as valor`;


    const result = await sequelize.query(`SELECT id as code, descricao as name, ${aux} from produtos where produtos.tipo = ${req.params.tipoProduto}`);
    console.log(aux);
    res.json(result[0]);
})

export { router_produtos };