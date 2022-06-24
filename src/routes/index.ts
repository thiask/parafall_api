import { Router } from "express";
import { Ip } from "../functions/ip";
import { route_version } from "./version";
import { router_produtos } from "./produtos/produtos.routes";
import { router_tipo } from "./produtos/tipo.routes";
import { router_unidade } from "./produtos/unidade.routes";
import { router_cliente } from "./clientes.routes";
import { router_venda } from "./vendas.routes";
import { router_usuarios } from "./usuarios";
import { router_forma_pag } from "./forma_pag.routes";
import { Middleware } from "../middleware/Middleware";
import { router_plano } from "./planos/planos";
import { router_pacotes } from "./pacotes/pacotes";
import router_dash_board from "./dash_board.routes";
import { router_fornecedor } from "./fonecedores.routes";
import { router_contas_pagar } from "./contasPagar.routes";
import { router_filiacao } from "./filiacao.routes";
import { router_contas_receber } from "./contasReceber.routes";
import { router_funcionario } from "./funcionarios.routes";
import { router_servicos } from "./servicos.routes";
import { router_processo } from "./processos.routes";
import { router_forma_pag_processo } from "./forma_pag_processos.routes";
const ip = new Ip();

const middleware = new Middleware();

const router = Router();

router.get('/validaIP', async (req, res, next) => {


    ip.setIp(req.socket.remoteAddress);

    const valid = await ip.validateIp();

    if (!valid) {
        res.json(false);
        console.log(`IP: ${ip.getIp()} - BLOCK`);
    }

    else res.json(true);
})

router.use('/usuarios', router_usuarios);
router.use(middleware.validToken);

router.put('/ip', (req, res) => {
    ip.setIp(req.socket.remoteAddress);
    const result = ip.setAcessIP();
    console.log('aqui');
    res.json(result);
});

router.use('/version', route_version);
router.use('/produtos', router_produtos);
router.use('/tipos', router_tipo);
router.use('/unidades', router_unidade);
router.use('/clientes', router_cliente);
router.use('/vendas', router_venda);
router.use('/formaPagamento', router_forma_pag);
router.use('/planos', router_plano);
router.use('/pacotes', router_pacotes);
router.use('/dashBoard', router_dash_board);
router.use('/fornecedores', router_fornecedor);
router.use('/contasPagar', router_contas_pagar);
router.use('/filiacao', router_filiacao);
router.use('/contasReceber', router_contas_receber);
router.use('/funcionarios', router_funcionario);
router.use('/servicos', router_servicos);
router.use('/processos', router_processo);
router.use('/formaPagamentoProcesso', router_forma_pag_processo);

export { router }