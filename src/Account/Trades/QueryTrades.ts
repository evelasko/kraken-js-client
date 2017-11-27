import {AuthChecker} from '../../Common/AuthChecker';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {AuthorizedClient, IOtp} from '../../Clients/AuthorizedClient';

export interface IQueryTrades extends IOtp {
    txid: string;
    trades?: boolean;
}

export class QueryTrades {

    protected client: AuthorizedClient;

    constructor(opts, client) {

        if (client instanceof AuthorizedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthorizedClient(opts);
        }

    }

    get(opts: IQueryTrades) {
        return new Promise((resolve, reject) => {

            this.client
                .post(KrakenEndoints.QueryTrades, opts)
                .then(resolve)
                .catch(reject);

        });
    }

}

