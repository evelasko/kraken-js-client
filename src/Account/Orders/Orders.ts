import {AuthorizedClient} from '../../Clients';
import {AuthChecker} from '../../Common';

import {ClosedOrders} from './ClosedOrders';
import {OpenOrders} from './OpenOrders';
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

    query(opts: IQueryOrders) {
        return this.QueryOrders.get(opts);
    }

    getClosed(opts: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ClosedOrders
                .get()
                .then(resolve)
                .catch(reject);
        })
    }

    getOpen(opts: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.OpenOrders
                .get()
                .then(resolve)
                .catch(reject);
        })
    }

}
