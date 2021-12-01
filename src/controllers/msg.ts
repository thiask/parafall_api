class Msg {

    private msg: Mensagem = { mensagem: '', author: 0, idProtocolo: 0 };

    getMsg() {
        return { msg: this.msg.mensagem, author: this.msg.author, idProtocolo: this.msg.idProtocolo }
    }

    setMsg(msg: Mensagem) {
        this.msg = msg;
    }
}

interface Mensagem {
    mensagem: string,
    author: number,
    idProtocolo: number
}