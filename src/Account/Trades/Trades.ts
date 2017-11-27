import {AuthorizedClient} from '../../Clients/AuthorizedClient';
import {AuthChecker} from '../../Common/AuthChecker';

import {ITradesHistory, TradesHistory} from './TradesHistory';
import {BalanceInfo, ITradeBalance, TradeBalance} from './TradeBalance';
import {ITradeVolume, TradeVolume} from './TradeVolume';
import {QueryTrades, IQueryTrades} from './QueryTrades';

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

    query(queryOpts: IQueryTrades) {
        return this._QueryTrades.get(queryOpts);
    }

    getHistory(opts: ITradesHistory) {
        return this._TradesHistory.get(opts);
    }

    getBalance(opts: ITradeBalance, raw: boolean): Promise<BalanceInfo | any> {
        return this._TradeBalance.get(opts, raw);
    }

    getVolume(opts: ITradeVolume) {
        return this._TradeVolume.get(opts);
    }

}
