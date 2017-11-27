import {AuthorizedClient, KrakenEndoints, IOtp} from '../../Clients';
import {AuthChecker} from '../../Common';

export interface IOpenOrders extends IOtp {
    trades?: boolean; // whether or not to include trades in output (optional.  default = false)
    userref?: string // restrict results to given user reference id (optional)
}

export class OpenOrders {

    client: AuthorizedClient;

    constructor(opts, client) {

        if (client instanceof AuthorizedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthorizedClient(opts);
        }

    }

    get(opts: IOpenOrders) {
        return this.client.post(KrakenEndoints.OpenOrders, opts);
    }
}