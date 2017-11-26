import {AuthorizedClient} from '../../Clients/AuthorizedClient';
import {AuthChecker} from '../../Common/AuthChecker';

import {ITradesHistory, TradesHistory} from './TradesHistory';
import {TradeBalance} from './TradeBalance';
import {TradeVolume} from './TradeVolume';
import {QueryTrades, IQueryTrades} from './QueryTrades';

export interface ITradeOpts {
    joinOrders: boolean;
}

export class Trades extends AuthChecker {

    protected client: AuthorizedClient;

    _TradesHistory: TradesHistory;
    _TradeBalance: TradeBalance;
    _TradeVolume: TradeVolume;
    _QueryTrades: QueryTrades;

    constructor(opts) {
        super(opts);

        this.client = new AuthorizedClient(opts);

        /**
         * Mount apis
         */
        this._TradesHistory = new TradesHistory({}, this.client);
        this._TradeBalance = new TradeBalance({}, this.client);
        this._TradeVolume = new TradeVolume({}, this.client);
        this._QueryTrades = new QueryTrades({}, this.client);
    }

    query(queryOpts: IQueryTrades, opts?: ITradeOpts) {
        return this._QueryTrades.get(queryOpts);
    }

    getHistory(opts: ITradesHistory) {
        return this._TradesHistory.get(opts);
    }

    getBalance(opts, raw) {
        return this._TradeBalance.get(opts, raw);
    }

    getVolume(opts) {
        return this._TradeVolume.get(opts);
    }

}
