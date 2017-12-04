import {KrakenEndoints} from '../../Clients';
import {Client} from '../../Util/DefaultClient';
import {IClientOpts, IKrakenResponse, IOtp} from '../../common/interfaces';

export interface IQueryOrders extends IOtp {
    trades?: boolean; //  whether or not to include trades in output (optional.  default = false)
    userref?: string; // restrict results to given user reference id (optional)
    txid: string; //comma delimited list of transaction ids to query info about (20 maximum)
}

export class QueryOrders extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client);
    }

    get(opts: IQueryOrders): Promise<IKrakenResponse<any>> {
        return this.client.post(KrakenEndoints.QueryOrders, opts);
    }
}