import {AuthorizedClient, IOtp} from '../Clients/AuthorizedClient';
import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {AuthChecker} from '../Common/AuthChecker';

export interface IOpenPositions extends IOtp {
    txid: string;
    docalcs?: boolean;
}

export class OpenPositions extends AuthChecker {

    protected client: AuthorizedClient;

    constructor(opts) {
        super(opts);
        this.client = new AuthorizedClient(opts);
    }

    get(opts: IOpenPositions) {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.OpenPositions, opts)
                .then(resolve)
                .catch(reject);

        });
    }

}
