import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const authConfig = require('../config/jwt/auth.json');

class Middleware {
    validToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) return res.status(401).send({ error: 'No token provided' });

        const parts = authHeader.split(' ');

        if (parts.length != 2) return res.status(401).send({ error: 'Token error' });

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' });

        jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
            if (err) return res.status(401).send({ error: 'Token inválido', msg: err });
            
            req.body.idUsrCad = decoded.id;
            
            return next();
        })
    }
}

export { Middleware }