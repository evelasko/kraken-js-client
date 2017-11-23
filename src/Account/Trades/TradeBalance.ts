import {AuthChecker} from '../../Common/AuthChecker';
import {KrakenEndoints} from '../../Clients/KrakenEndpoints';
import {AuthorizedClient} from '../../Clients/AuthorizedClient';

interface IBalance {
    eb: string,
    tb: string,
    m: string,
    n: string,
    c: string,
    v: string,
    e: string,
    mf: string,
    ml: string
}

class BalanceInfo {

    _balance: IBalance;

    constructor(balance: IBalance) {
        this._balance = balance;
    }

    getRawData() {
        return this._balance;
    }

    getEquivalentBalance() {
        return this._balance.eb;
    }

    getTradeBalance() {
        return this._balance.tb;
    }

    getMarginAmount() {
        return this._balance.m;
    }

    getUnrealizedNetProfit() {
        return this._balance.n;
    }

    getCostBasis() {
        return this._balance.c;
    }

    getCurrentValuation() {
        return this._balance.v;
    }

    getEquity() {
        return this._balance.e;
    }

    getFreeMargin() {
        return this._balance.mf;
    }

    getMarginLevel() {
        return this._balance.ml;
    }

}

export class TradeBalance {

    protected client: AuthorizedClient;

    constructor(opts, client) {

        if (client instanceof AuthorizedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthorizedClient(opts);
        }

    }

    get(opts, raw) {
        return new Promise((resolve, reject) => {

            this.client.post(KrakenEndoints.TradeBalance, opts)
                .then((d: IBalance) => {
                    resolve(raw ? d : new BalanceInfo(d));
                })
                .catch(reject);

        });
    }
}
