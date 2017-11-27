import {AuthorizedClient, KrakenEndoints} from '../../Clients';
import {AuthChecker} from '../../Common';
import {IOtp} from '../../Clients/AuthorizedClient';

export interface IQueryOrders extends IOtp {
    trades?: boolean; //  whether or not to include trades in output (optional.  default = false)
    userref?: string; // restrict results to given user reference id (optional)
    txid: string; //comma delimited list of transaction ids to query info about (20 maximum)
}

export class QueryOrders {
    client: AuthorizedClient;

    constructor(opts, client) {

        if (client instanceof AuthorizedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthorizedClient(opts);
        }

    }

    get(opts: IQueryOrders) {
        return this.client.post(KrakenEndoints.QueryOrders, opts);
    }
}