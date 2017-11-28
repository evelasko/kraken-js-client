import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {IOtp} from '../../Clients/HttpClient';
import {Client} from '../../Util/DefaultClient';
import {TradeTypeType} from '../../Common/types';

export interface ITradesHistory extends IOtp {
    type?: TradeTypeType; // type of trade (optional)
        // all = all types (default)
        // any position = any position (open or closed)
        // closed position = positions that have been closed
        // closing position = any trade closing all or part of a position
        // no position = non-positional trades
    trades?: boolean; // whether or not to include trades related to position in output (optional.  default = false)
    start?: number | string // starting unix timestamp or trade tx id of results (optional.  exclusive)
    end?: number | string // ending unix timestamp or trade tx id of results (optional.  inclusive)
    ofs?: number | string // result offset
}

export class TradesHistory extends Client {


    constructor(opts, client?) {
        super(opts, client);
    }

    get(opts: ITradesHistory) {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.TradesHistory, opts)
                .then(resolve)
                .catch(reject);

        });
    }

}

