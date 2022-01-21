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
    res.json(result);
});

router.use('/version', route_version);
router.use('/produtos', router_produtos);
router.use('/tipos', router_tipo);
router.use('/unidades', router_unidade);
router.use('/clientes', router_cliente);
router.use('/vendas', router_venda);
router.use('/formaPagamento', router_forma_pag);

export { router }