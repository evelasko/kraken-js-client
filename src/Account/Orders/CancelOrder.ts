import {Client} from '../../Util/DefaultClient';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';

export interface IOrderCancel {
    txid: string; // transaction id
}

export class CancelOrder extends Client {

    constructor(opts, client?) {
        super(opts, client);
    }

    cancel(opts: IOrderCancel) {
        return new Promise((resolve, reject) => {
            this.client
                .post(KrakenEndoints.CancelOrder, opts)
                .then(resolve)
                .catch(reject);
        })
    }

}