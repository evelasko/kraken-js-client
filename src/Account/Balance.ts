import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Client} from '../Util/DefaultClient';
import {IClientOpts} from '../common/interfaces';

export class Balance extends Client {

    constructor(opts?: IClientOpts, client?) {
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
