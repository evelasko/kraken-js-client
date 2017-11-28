import {IOtp, KrakenEndoints} from '../../Clients';
import {Client} from '../../Util/DefaultClient';
import {OrderCloseTimeType} from '../../Common/types';

export interface IClosedOrders extends IOtp {
    trades?: boolean // whether or not to include trades in output (optional.  default = false)
    userref?: string;// restrict results to given user reference id (optional)
    start?: number | string; //starting unix timestamp or order tx id of results (optional.  exclusive)
    end?: number | string; //ending unix timestamp or order tx id of results (optional.  inclusive)
    ofs?: number | string; // result offset
    closetime?: OrderCloseTimeType; // which time to use (optional) both (default)
}

export class ClosedOrders extends Client {

    constructor(opts, client?) {
        super(opts, client);
    }

    get(opts: IClosedOrders) {
        return new Promise((resolve, reject) => {
            this.client
                .post(KrakenEndoints.ClosedOrders, opts)
                .then(resolve)
                .catch(reject);
        });
    }
}