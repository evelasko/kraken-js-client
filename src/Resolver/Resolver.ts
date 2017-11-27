import {extend, forEach, map} from 'lodash';
import {Trades} from '../Account/Trades';
import {AuthChecker} from '../Common/AuthChecker';
import {Orders} from '../Account/Orders/Orders';
import {IQueryTrades} from '../Account/Trades/QueryTrades';
import {ITradesHistory} from '../Account/Trades/TradesHistory';
import {Helper} from '../Common/Helper';

export class Resolver extends AuthChecker {

    protected Trades: Trades;
    protected Orders: Orders;

    constructor(opts) {
        super(opts);
        this.Trades = new Trades(opts);
        this.Orders = new Orders(opts);
    }

    private fetchOrder(oids: Array<string>, opts?): Promise<any> {
        opts = opts || {};
        return this.Orders.query(Object.assign({}, opts, {
            txid: oids.join(',')
        }));
    }

    private fetchOrders(orderIds: Array<string>, opts: any) {

        let oIds = Helper.chunkArray(orderIds, 20);

        let numberOfChunks = oIds.length;

        return new Promise(async (resolve, reject) => {
            let n = 0;
            let result = {};

            while (n < numberOfChunks) {
                let res;

                try {
                    res = await this.fetchOrder(oIds[n], opts);
                } catch (e) {
                    reject(e);
                }

                result = extend(result, res);
                n++;
            }

            resolve(result);
        });
    }

    private joinOrders(trades: any) {

        return new Promise((resolve, reject) => {
            let orderIds: Array<string> = map(trades, (t: any) => {
                return t.ordertxid;
            });

            this.fetchOrders(orderIds, {})
                .then((orders: any) => {

                    let rTrades = {};
                    forEach(trades, (t, tId) => {

                        t.id = tId;
                        rTrades[t.id] = t;

                        forEach(orders, (order: any, oId: string) => {
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
                .then((trades: any) => {
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
                .then((res: any) => {
                    let trades = res.trades;

                    this.joinOrders(trades)
                        .then(resolve)
                        .catch(reject);

                })
                .catch(reject);
        });
    }


}