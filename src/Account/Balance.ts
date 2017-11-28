import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Client} from '../Util/DefaultClient';

export class Balance extends Client {

    constructor(opts, client?) {
        super(opts, client);
    }

    get() {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.Balance, {})
                .then(resolve)
                .catch(reject);

        });
    }

}
