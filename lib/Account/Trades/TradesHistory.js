const AuthChecker = require('../../Common/AuthChecker');
const Endpoints = require('../../Clients/KrakenEndpoints');
const AuthenticatedClient = require('../../Clients/AuthorizedClient');

class TradesHistory {

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

            this.client.post(Endpoints.TradesHistory, opts)
                .then(resolve)
                .catch(reject);

        });
    }

}

module.exports = TradesHistory;