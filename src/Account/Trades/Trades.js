const AuthenticatedClient = require('../../Clients/AuthorizedClient');
const AuthChecker = require('../../Common/AuthChecker');

const TradesHistory = require('./TradesHistory');
const TradeBalance = require('./TradeBalance');
const TradeVolume = require('./TradeVolume');

class Trades extends AuthChecker {

    constructor(opts) {
        super(opts);

        this.client = new AuthenticatedClient(opts);

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

module.exports = Trades;