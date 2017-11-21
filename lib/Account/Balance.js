const AuthenticatedClient = require('../Clients/AuthorizedClient');
const Endpoints = require('../Clients/KrakenEndpoints');
const AuthChecker = require('../Common/AuthChecker');

class Balance extends AuthChecker {

    constructor(opts) {
        super(opts);
        this.client = new AuthenticatedClient(opts);
    }

    get() {
        return new Promise((resolve, reject) => {

            this.client.post(Endpoints.Balance, {})
                .then(resolve)
                .catch(reject);

        });
    }

}

module.exports = Balance;