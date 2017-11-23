const AuthChecker = require('../../Common/AuthChecker');
const Endpoints = require('../../Clients/KrakenEndpoints');
const AuthenticatedClient = require('../../Clients/AuthorizedClient');


class BalanceInfo {

    constructor(balance) {
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

class TradeBalance {

    constructor(opts, client) {

        if (client instanceof AuthenticatedClient) {
            this.client = client;
        } else {
            new AuthChecker(opts);
            this.client = new AuthenticatedClient(opts);
        }

    }

    get(opts, raw) {
        return new Promise((resolve, reject) => {

            this.client.post(Endpoints.TradeBalance, opts)
                .then((d) => {
                    resolve(raw ? d : new BalanceInfo(d));
                })
                .catch(reject);

        });
    }
}

module.exports = TradeBalance;