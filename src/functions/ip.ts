class Ip {

    private ip: string | undefined;

    getIp() {
        return this.ip;
    }

    setIp(ip: string | undefined) {
        this.ip = ip != undefined ? ip.replace(/[^0-9.]/gi, '') : '';
    }

    validateIp(): boolean {
        if (this.ip == '10.0.0.31') return false;
        else return true;
    }
}

export { Ip }