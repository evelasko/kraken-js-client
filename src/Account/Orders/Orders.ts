import {AuthorizedClient} from '../../Clients';
import {AuthChecker} from '../../Common';

import {ClosedOrders} from './ClosedOrders';
import {OpenOrders} from './OpenOrders';
import {IQueryOrders, QueryOrders} from './QueryOrders';
import {IOtp} from '../../Clients/AuthorizedClient';

export interface IClosedOrders extends IOtp {
    trades?: boolean // whether or not to include trades in output (optional.  default = false)
    userref?: string;// restrict results to given user reference id (optional)
    start: number | string; //starting unix timestamp or order tx id of results (optional.  exclusive)
    end: number | string; //ending unix timestamp or order tx id of results (optional.  inclusive)
    ofs: number | string; // result offset
    closetime?: 'open' | 'close' | 'both'; // which time to use (optional) both (default)
}

export interface IOpenOrders extends IOtp {
    trades?: boolean; // whether or not to include trades in output (optional.  default = false)
    userref?: string // restrict results to given user reference id (optional)
}

export class Orders extends AuthChecker {
    protected client: AuthorizedClient;

    private ClosedOrders: ClosedOrders;
    private OpenOrders: OpenOrders;
    private QueryOrders: QueryOrders;

    constructor(opts) {
        super(opts);

        this.client = new AuthorizedClient(opts);

        /**
         * Mount apis
         */
        this.ClosedOrders = new ClosedOrders({}, this.client);
        this.OpenOrders = new OpenOrders({}, this.client);
        this.QueryOrders = new QueryOrders({}, this.client);
    }

    query(opts: IQueryOrders): Promise<any> {
        return this.QueryOrders.get(opts);
    }

    getClosed(opts: IClosedOrders): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ClosedOrders
                .get()
                .then(resolve)
                .catch(reject);
        })
    }

    getOpen(opts: IOpenOrders): Promise<any> {
        return new Promise((resolve, reject) => {
            this.OpenOrders
                .get()
                .then(resolve)
                .catch(reject);
        })
    }

}
