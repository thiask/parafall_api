import { Router } from "express";
import { usuario } from "../../models/usuario";
import md5 from "md5";
import { UserController } from "../../controllers/UserController";

import jwt from "jsonwebtoken";
const authConfig = require('../../config/jwt/auth.json');

const user = new UserController();

const router_usuarios = Router();

router_usuarios.post('/cadastrar', async (req, res) => {
    const result = await usuario.create(req.body);

    res.json(result);
});

router_usuarios.put('/alterar', async (req, res) => {

    req.body.senha = md5(req.body.senha);

    const result = await usuario.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json(result);
});

router_usuarios.delete('/deletar/:id', async (req, res) => {
    const result = await usuario.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_usuarios.post('/login/', async (req, res) => {
    const result: any = await usuario.findOne({
        where: {
            usuario: req.body.usuario,
            senha: req.body.senha
        },
        raw: true,
    });

    if (result != null) {

        const token = user.createToken(result.id);
        res.json({ status: 1, token: token });

    } else {
        res.json({ status: 0 });
    }

});

router_usuarios.get('/listar/:usuario', async (req, res) => {
    const result = await usuario.findAll({
        where: {
            usuario: req.params.usuario
        },
    });
    res.json(result);
});

router_usuarios.get('/permissao', async (req, res) => {
    const authHeader: any = req.headers.authorization;

    const parts = authHeader.split(' ');

    if (parts.length != 2) return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
        if (err) return res.status(401).send({ error: 'Token inválido', msg: err });

        req.body.idUsrCad = decoded.id;

        console.log(req.body.idUsrCad);
    })
    const result = await usuario.findAll({
        where: {
            id: req.body.idUsrCad
        },
    });
    res.json(result);
});

router_usuarios.get('/listarCustom', async (req, res) => {
    const result = await usuario.findAll({
        attributes: [['id', 'code'], ['nome', 'name']]
    });
    res.json(result);
})

export { router_usuarios };