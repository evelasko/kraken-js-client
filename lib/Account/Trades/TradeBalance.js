const AuthChecker = require('../../Common/AuthChecker');
const Endpoints = require('../../Clients/KrakenEndpoints');
const AuthenticatedClient = require('../../Clients/AuthorizedClient');

class TradeBalance {

    constructor(opts, client) {

        if (opts && !client) {
            new AuthChecker(opts);
        }

        if (client instanceof AuthenticatedClient) {
            this.client = client;
        } else {
            this.client = new AuthenticatedClient(opts);
        }

    }

    get(opts) {
        return new Promise((resolve, reject) => {

            this.client.post(Endpoints.TradeBalance, opts)
                .then(resolve) //TODO: parse results first
                .catch(reject);

        });
    }
}

module.exports = TradeBalance;