import crypto, { randomBytes } from 'crypto';

const alg: string = 'aes-256-ctr';
const pwd: string = '6c3e0c7d39168e9db044971d0b884352';

export function encrypt(text: string, iv: Buffer) {
    const cipher = crypto.createCipheriv(alg, pwd, iv);
    const crypted = cipher.update(text, 'utf8', 'hex');
    return crypted;
}

export function decrypt(text: string, iv: Buffer) {
    const decipher = crypto.createDecipheriv(alg, pwd, iv);
    const plain = decipher.update(text, 'hex', 'utf8');
    return plain;
}

export function getIv() {
    return randomBytes(16);
}