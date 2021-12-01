import { Router } from "express";
import { Version } from "../controllers/version";

const route_version = Router();

route_version.get('/', (req, res) => {

    const user = new Version();
    
    return res.status(201).send({version: user.getVersion()});
})

export { route_version }