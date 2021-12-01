import { Router } from "express";
import { Ip } from "../functions/ip";
import { route_version } from "./version";

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

export { router }