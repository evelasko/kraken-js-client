import {KrakenEndoints, HttpClient} from '../../clients';
import {Client} from '../../util/DefaultClient';
import {IClientOpts, IKrakenResponse, IOtp} from '../../common/interfaces';

export interface IQueryTrades extends IOtp {
    txid: string;
    trades?: boolean;
}

export class QueryTrades extends Client {

    constructor(opts?: IClientOpts, client?: HttpClient) {
        super(opts, client);
    }

    get(opts: IQueryTrades): Promise<IKrakenResponse<any>> {
        return new Promise((resolve, reject) => {

            this.client
                .post(KrakenEndoints.QueryTrades, opts)
                .then(resolve)
                .catch(reject);

        });
    }

}

