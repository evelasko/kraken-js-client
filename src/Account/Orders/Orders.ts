import {AuthorizedClient} from '../../Clients';
import {AuthChecker} from '../../Common';

import {ClosedOrders, IClosedOrders} from './ClosedOrders';
import {IOpenOrders, OpenOrders} from './OpenOrders';
import {IQueryOrders, QueryOrders} from './QueryOrders';

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
                .get(opts)
                .then(resolve)
                .catch(reject);
        })
    }

    getOpen(opts: IOpenOrders): Promise<any> {
        return new Promise((resolve, reject) => {
            this.OpenOrders
                .get(opts)
                .then(resolve)
                .catch(reject);
        })
    }

}
