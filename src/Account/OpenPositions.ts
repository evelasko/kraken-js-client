import {IOtp} from '../Clients/HttpClient';
import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Client} from '../Util';

export interface IOpenPositions extends IOtp {
    txid: string;
    docalcs?: boolean;
}

export class OpenPositions extends Client {

    constructor(opts, client?) {
        super(opts, client);
    }

    get(opts: IOpenPositions) {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.OpenPositions, opts)
                .then(resolve)
                .catch(reject);

        });
    }

}
