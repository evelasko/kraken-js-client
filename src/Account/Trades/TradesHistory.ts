import {AuthChecker} from '../../Common/AuthChecker';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {AuthorizedClient} from '../../Clients/AuthorizedClient';

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

    get(opts) {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.TradesHistory, opts)
                .then(resolve)
                .catch(reject);

        });
    }

}

