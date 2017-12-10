
import {ITradesHistory, TradesHistory} from './TradesHistory';
import {BalanceInfo, IBalance, ITradeBalance, TradeBalance} from './TradeBalance';
import {ITradeVolume, TradeVolume} from './TradeVolume';
import {QueryTrades, IQueryTrades} from './QueryTrades';
import {Client} from '../../util/DefaultClient';
import {HttpClient} from '../../clients/HttpClient';
import {IClientOpts, IKrakenResponse} from '../../common/interfaces';

export class Trades extends Client {

    _TradesHistory: TradesHistory;
    _TradeBalance: TradeBalance;
    _TradeVolume: TradeVolume;
    _QueryTrades: QueryTrades;

    constructor(opts?: IClientOpts, client?: HttpClient) {
        super(opts, client);

        /**
         * Mount apis
         */
        this._TradesHistory = new TradesHistory({}, this.client);
        this._TradeBalance = new TradeBalance({}, this.client);
        this._TradeVolume = new TradeVolume({}, this.client);
        this._QueryTrades = new QueryTrades({}, this.client);
    }

    query(queryOpts: IQueryTrades): Promise<IKrakenResponse<any>> {
        return this._QueryTrades.get(queryOpts);
    }

    getHistory(opts: ITradesHistory): Promise<IKrakenResponse<any>> {
        return this._TradesHistory.get(opts);
    }

    getBalance(opts: ITradeBalance, raw: boolean): Promise<BalanceInfo | IKrakenResponse<IBalance>> {
        return this._TradeBalance.get(opts, raw);
    }

    getVolume(opts: ITradeVolume): Promise<IKrakenResponse<any>> {
        return this._TradeVolume.get(opts);
    }

}
