import {AuthorizedClient} from '../../Clients/AuthorizedClient';
import {AuthChecker} from '../../Common/AuthChecker';

import {TradesHistory} from './TradesHistory';
import {TradeBalance} from './TradeBalance';
import {TradeVolume} from './TradeVolume';

export class Trades extends AuthChecker {
    protected client: AuthorizedClient;

    _TradesHistory: TradesHistory;
    _TradeBalance: TradeBalance;
    _TradeVolume: TradeVolume;

    constructor(opts) {
        super(opts);

        this.client = new AuthorizedClient(opts);

        /**
         * Mount apis
         */
        this._TradesHistory = new TradesHistory({}, this.client);
        this._TradeBalance = new TradeBalance({}, this.client);
        this._TradeVolume = new TradeVolume({}, this.client);
    }

    getHistory(opts) {
        return this._TradesHistory.get(opts);
    }

    getBalance(opts, raw) {
        return this._TradeBalance.get(opts, raw);
    }

    getVolume(opts) {
        return this._TradeVolume.get(opts);
    }

}
