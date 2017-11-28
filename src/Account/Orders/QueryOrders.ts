import {KrakenEndoints} from '../../Clients';
import {IOtp} from '../../Clients/HttpClient';
import {Client} from '../../Util/DefaultClient';

export interface IQueryOrders extends IOtp {
    trades?: boolean; //  whether or not to include trades in output (optional.  default = false)
    userref?: string; // restrict results to given user reference id (optional)
    txid: string; //comma delimited list of transaction ids to query info about (20 maximum)
}

export class QueryOrders extends Client {

    constructor(opts, client?) {
        super(opts, client);
    }

    get(opts: IQueryOrders) {
        return this.client.post(KrakenEndoints.QueryOrders, opts);
    }
}