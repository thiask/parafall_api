import { ip } from '../models/ip';
import moment from 'moment';

class Ip {

    private ip: string | undefined;

    getIp() {
        return this.ip;
    }

    setIp(ip: string | undefined) {
        this.ip = ip != undefined ? ip.replace(/[^0-9.]/gi, '') : '';
    }

    async validateIp() {
        const now = moment(new Date()).format("YYYY-MM-DD");

        const valid = await ip.findOne({
            where: {
                address: this.ip,
                date: now
            }
        });

        if (valid == null) return false;
        else return true;
    }

    async setAcessIP() {
        const now: any = moment(new Date()).format("YYYY-MM-DD 00:00:00");

        const data = { date: now, address: this.ip };

        const update = await ip.update(data,
            {
                where: {
                    id: 1
                }
            });
        console.log(update);
        return update;
    }
}

export { Ip }