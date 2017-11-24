import {AuthorizedClient, KrakenEndoints} from '../../Clients';
import {AuthChecker} from '../../Common';

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

    get(opts = {}) {
        return this.client.post(KrakenEndoints.OpenOrders, opts);
    }
}