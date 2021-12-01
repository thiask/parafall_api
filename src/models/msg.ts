import mongoose from '../config/db';

const mensagens = new mongoose.Schema({
    idProtocolo: Number,
    author: Number,
    msg: String,
    date: String,
    url: String,
    dataCad: Date
});

const msg = mongoose.model('Mensagens', mensagens);

export default msg;