import {AuthorizedClient, KrakenEndoints} from '../../Clients';
import {AuthChecker} from '../../Common';

import {ClosedOrders} from './ClosedOrders';
import {OpenOrders} from './OpenOrders';

export class Orders extends AuthChecker {
    protected client: AuthorizedClient;

    private protected ClosedOrders: ClosedOrders;
    private protected OpenOrders: OpenOrders;

    constructor(opts) {
        super(opts);

        this.client = new AuthorizedClient(opts);

        /**
         * Mount apis
         */
        this.ClosedOrders = new ClosedOrders({}, this.client);
        this.OpenOrders = new OpenOrders({}, this.client);
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
