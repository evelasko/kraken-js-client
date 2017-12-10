import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Client} from '../util/DefaultClient';
import {IClientOpts, IKrakenResponse} from '../common/interfaces';

export class Balance extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client);
    }

    get(): Promise<IKrakenResponse<any>> {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.Balance, {})
                .then(resolve)
                .catch(reject);

        });
    }

}
