import {Client} from '../../Util/DefaultClient';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {OrderTypeType, OrderFlagsType, OrderType} from '../../common/types';
import {IClientOpts, IKrakenResponse, IOtp} from '../../common/interfaces';


export interface IOrderAdd extends IOtp {
    pair: string; // asset pair
    type: OrderType; // type of order (buy/sell)
    ordertype: OrderTypeType;  // order type:
    price?: string; // price (optional.  dependent upon ordertype)
    price2?: string; // secondary price (optional.  dependent upon ordertype)
    volume: string // order volume in lots
    leverage?: string; // amount of leverage desired (optional.  default = none)
    oflags?: OrderFlagsType // comma delimited list of order flags (optional):
    starttm?: number | string; // scheduled start time (optional):
    expiretm?: number | string // expiration time (optional):
    userref?: string; // user reference id.  32-bit signed number.  (optional)
    validate?: boolean // validate inputs only.  do not submit order (optional)
}

export class AddOrder extends Client {

    constructor(opts: IClientOpts, client?) {
        super(opts, client);
    }

    add(order: IOrderAdd): Promise<IKrakenResponse<any>> {
        return new Promise((resolve, reject) => {
            this.client
                .post(KrakenEndoints.AddOrder, order)
                .then(resolve)
                .catch(reject);
        });
    }
}