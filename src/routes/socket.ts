import socket from 'socket.io';
import http from 'http';
import { decrypt, encrypt, getIv } from '../functions/cript';
import uploads from '../config/multer';
import { app } from '../app';
import moment from 'moment';
import 'moment/locale/pt-br';
import msg from '../models/msg';
import path from 'path';
import Mail from "../service/mail";

const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
    path: '/socket.io',
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (client: socket.Socket) => {
    client.on('disconnect', async () => {
        console.log('Disconect ' + client.id);
    });
})

let i = 0;

app.post('/medicao', async (req, res) => {
    
    if (i == 20) i = 0;

    if (parseFloat(req.body.medicao) > 27 && i == 0) {
        // const message = Object.assign({}, { to: 'thiask@gmail.com', subject: 'Alert', message: `Bomba ${req.body.terminal} super aquecida ${req.body.medicao} °C` });
        // Mail.to = message.to;
        // Mail.subject = message.subject;
        // Mail.message = message.message;

        // Mail.sendMail();
        i = 1;
    }


    const data = { medicao: req.body.medicao, terminal: req.body.terminal };
    res.json(data);
    console.log(data);
    io.emit("medicao", data);
    i++;
})


export { httpServer };