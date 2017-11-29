import {KrakenEndoints} from '../../Clients';
import {Client} from '../../Util/DefaultClient';
import {HttpClient} from '../../clients/HttpClient';
import {IClientOpts, IOtp} from '../../common/interfaces';

export interface IOpenOrders extends IOtp {
    trades?: boolean; // whether or not to include trades in output (optional.  default = false)
    userref?: string // restrict results to given user reference id (optional)
}

export class OpenOrders extends Client {

    constructor(opts?: IClientOpts, client?: HttpClient) {
        super(opts, client);
    }

    get(opts: IOpenOrders) {
        return new Promise((resolve, reject) => {
            this.client
                .post(KrakenEndoints.OpenOrders, opts)
                .then(resolve)
                .catch(reject);
        });
    }
}