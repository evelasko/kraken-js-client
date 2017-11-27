import {AuthorizedClient, KrakenEndoints, IOtp} from '../../Clients';
import {AuthChecker} from '../../Common';

export interface IClosedOrders extends IOtp {
    trades?: boolean // whether or not to include trades in output (optional.  default = false)
    userref?: string;// restrict results to given user reference id (optional)
    start?: number | string; //starting unix timestamp or order tx id of results (optional.  exclusive)
    end?: number | string; //ending unix timestamp or order tx id of results (optional.  inclusive)
    ofs?: number | string; // result offset
    closetime?: 'open' | 'close' | 'both'; // which time to use (optional) both (default)
}

export class ClosedOrders {
    client: AuthorizedClient;

    constructor(opts, client) {

        if (client instanceof AuthorizedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthorizedClient(opts);
        }

    }

    get(opts: IClosedOrders) {
        return this.client.post(KrakenEndoints.ClosedOrders, opts);
    }
}