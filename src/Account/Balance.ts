import {AuthorizedClient} from '../Clients/AuthorizedClient';
import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {AuthChecker} from '../Common/AuthChecker';

export class Balance extends AuthChecker {

    protected client: AuthorizedClient;

    constructor(opts) {
        super(opts);
        this.client = new AuthorizedClient(opts);
    }

    get() {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.Balance, {})
                .then(resolve)
                .catch(reject);

        });
    }

}
