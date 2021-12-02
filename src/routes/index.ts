import { Router } from "express";
import { Ip } from "../functions/ip";
import { route_version } from "./version";
import { router_produtos } from "./produtos/produtos.routes";
import { router_tipo } from "./produtos/tipo.routes";
import { router_unidade } from "./produtos/unidade.routes";


const router = Router();

router.use('*', (req, res, next) => {
    const ip = new Ip();

    ip.setIp(req.socket.remoteAddress);

    if (!ip.validateIp()) {

        res.status(403).send({ msg: 'IP block' });
        console.log(`IP: ${ip.getIp()} - BLOCK`);
    }
    else next();
})

router.use('/version', route_version);
router.use('/produtos', router_produtos);
router.use('/tipos', router_tipo);
router.use('/unidades', router_unidade);

export { router }