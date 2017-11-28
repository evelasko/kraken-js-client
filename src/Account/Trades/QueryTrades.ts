import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {IOtp} from '../../Clients/HttpClient';
import {Client} from '../../Util/DefaultClient';

export interface IQueryTrades extends IOtp {
    txid: string;
    trades?: boolean;
}

export class QueryTrades extends Client {


    constructor(opts, client?) {
        super(opts, client);
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

