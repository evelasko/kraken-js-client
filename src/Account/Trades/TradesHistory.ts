import {AuthChecker} from '../../Common/AuthChecker';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {AuthorizedClient} from '../../Clients/AuthorizedClient';

export interface ITradesHistory {
    type?: 'all' | 'any position' | 'closed position' | 'closing position' | 'no position'; // type of trade (optional)
        // all = all types (default)
        // any position = any position (open or closed)
        // closed position = positions that have been closed
        // closing position = any trade closing all or part of a position
        // no position = non-positional trades
    trades?: boolean; // whether or not to include trades related to position in output (optional.  default = false)
    start?: number | string // starting unix timestamp or trade tx id of results (optional.  exclusive)
    end?: number | string // ending unix timestamp or trade tx id of results (optional.  inclusive)
    ofs?: number | string // result offset
}

export class TradesHistory {

    protected client: AuthorizedClient;

    constructor(opts, client) {

        if (client instanceof AuthorizedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthorizedClient(opts);
        }

    }

    get(opts: ITradesHistory) {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.TradesHistory, opts)
                .then(resolve)
                .catch(reject);

        });
    }

}

