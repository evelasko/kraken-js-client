const AuthenticatedClient = require('../Clients/AuthorizedClient');
const Endpoints = require('../Clients/KrakenEndpoints');

class Balance {

    constructor(opts) {
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