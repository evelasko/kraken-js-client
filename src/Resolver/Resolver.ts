import {forEach, map} from 'lodash';
import {Trades} from '../Account/Trades';
import {AuthChecker} from '../Common/AuthChecker';
import {Orders} from '../Account/Orders/Orders';
import {IQueryTrades} from '../Account/Trades/QueryTrades';
import {ITradesHistory} from '../Account/Trades/TradesHistory';

export class Resolver extends AuthChecker {

    protected Trades: Trades;
    protected Orders: Orders;

    constructor(opts) {
        super(opts);
        this.Trades = new Trades(opts);
        this.Orders = new Orders(opts);
    }

    private joinOrders(trades) {

        return new Promise((resolve, reject) => {
            let orderIds: Array<string> = map(trades, (t) => {
                return t.ordertxid;
            });
            //TODO: Handle fetching more then 20 orders
            // for now it fetches only first 20
            let oIds = orderIds.length > 19 ? orderIds.slice(0, 19) : orderIds;

            this.Orders.query({
                txid: oIds.join(',')
            }).then((orders) => {

                let rTrades = {};
                forEach(trades, (t, tId) => {

                    t.id = tId;
                    rTrades[t.id] = t;

                    forEach(orders, (order, oId) => {
                        if (oId === t.ordertxid) {
                            order.id = oId;
                            t.order = order;
                        }
                    });

                });

                resolve(rTrades);
            }).catch(reject)
        });
    }

    queryTradesJoinOrders(opts: IQueryTrades) {
        return new Promise((resolve, reject) => {
            this.Trades
                .query(opts)
                .then((res) => {
                    let trades = res.trades;

                    this.joinOrders(trades)
                        .then(resolve)
                        .catch(reject);

                })
                .catch(reject);
        });
    }

    tradeHistoryJoinOrders(opts: ITradesHistory) {
        return new Promise((resolve, reject) => {
            this.Trades
                .getHistory(opts)
                .then((res) => {
                    let trades = res.trades;

                    this.joinOrders(trades)
                        .then(resolve)
                        .catch(reject);

                })
                .catch(reject);
        });
    }


}