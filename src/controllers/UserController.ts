import Jwt from "jsonwebtoken";
const authConfig = require('../config/jwt/auth.json');

export class UserController {
    static createToken: any;

    createToken(id: any) {
        
        return Jwt.sign({ id: id }, authConfig.secret, {
            expiresIn: '9999 years',
        });
    }
}

function handleError(err: any): void {
    throw new Error(err);
}
